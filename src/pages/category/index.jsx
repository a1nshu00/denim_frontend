import LayoutMain from "@layout/main"
import { useState, useEffect, useMemo , useCallback} from "react"
import { Form, Modal, Card, Loader } from "@components"
import { ProductService, CategoryService } from "@service"
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable,  { createTheme } from "react-data-table-component"
import CreateOrEditModal from "./CreateOrEditModal"
import Action from "./Action"

createTheme('solarized', {
    text: {
      primary: '#022',
      secondary: '#025',
    },
    background: {
      default: 'rgba(105, 108, 255, 0.07)',
    },
    divider: {
      default: '#FFFFFF',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
}, 'dark');

export default function CategoryPage() {
    const [listData, setListData]             = useState([])
    const [expandedListData, setExpandedListData] = useState([])
    const [loadingListData, setLoadingListData] = useState(true)

    const [selectedRows, setSelectedRows]     = useState([]);
	const [toggleCleared, setToggleCleared]   = useState(false);


    const [selectedID, setSelectedID]         = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalValues, setModalValues]       = useState({})
    const [modalTitle, setModalTitle]         = useState('Create Product Category');

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () =>{
        setLoadingListData(true)
        const result = await CategoryService.list({ subCategory:true });
        
        if (result.status) {
            setListData(result.data);
        } 
        
        setLoadingListData(false)
    }
 
    const columns = [
        // {
        //     name: "ID",
        //     selector: (row) => row.gID,
        //     sortable: true,
        //     grow:1
        // },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
            grow:3
        },
        {
            name: "Description",
            sortable: true,
            selector: (row) => row.description,
            grow:4
        },
        {
            name: "Created At",
            sortable: true,
            selector: (row) => row.createdAt,
            grow:2
        },
        {
            name: "Sub Categories",
            sortable: true,
            selector: (row) => row.subCategories.length,
            grow:1
        },
        {
            name: "Status",
            sortable: true,
            selector: (row) => row.status,
            cell: (row) => <span className={`badge bg-label-${row.status ? 'success' : 'secondary'} me-1`}>{row.status ? 'Active' : 'Inactive'}</span> ,
            grow:1
        },
        {
            name: "Action",
            sortable: false,
            selector: (row) => row.status,
            cell: (row) => <Action row={row} addSubCategory={addSubCategory} onDeleteRow={deleteCategory} onEdit={editCategory} isMainCategory={true} />,
            grow:1
            // width:'10px'
        },
    ]
     
    const subCategoryColumns = [
        // {
        //     name: "ID",
        //     selector: (row) => row.gID,
        //     sortable: true,
        // },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Description",
            sortable: true,
            selector: (row) => row.description,
        },
        {
            name: "Created At",
            sortable: true,
            selector: (row) => row.createdAt,
        },
        {
            name: "Status",
            sortable: true,
            selector: (row) => row.status,
            cell: (row) => <span className={`badge bg-label-${row.status ? 'success' : 'secondary'} me-1`}>{row.status ? 'Active' : 'Inactive'}</span> ,
        },
        {
            name: "Action",
            sortable: true,
            selector: (row) => row.status,
            cell: (row) => <Action row={row} onDeleteRow={deleteCategory}  onEdit={editCategory}  />,
        },
    ]

 
    const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

    const contextActions = useMemo(() => {
        const handleDelete = () => {
            console.log({selectedRows,toggleCleared});
            // if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.title)}?`)) {
                setToggleCleared(!toggleCleared);
            //     setData(differenceBy(data, selectedRows, 'title'));
            // }
        };

        return (
            <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small"  />
                </ListItemIcon>
            </MenuItem>
        );
	}, [listData, selectedRows, toggleCleared]);

       
    const openModel = () => {
        setIsModalVisible(true);
        setModalTitle('Create Product Category');
    }

    const subHeaderComponentMemo = useMemo(() => {
        return (
           <div style={{ width:"100%", display:"flex", justifyContent:'space-between', alignItems:"center" }}>
            {/* <h4 className="mt-1">
                Product Categories
            </h4> */}
            <Button variant="outlined"  onClick={openModel} startIcon={<AddIcon fontSize="small" />}>
                Create
            </Button>
           </div>
        )
    }, [])
   
    const rowPreExpanded = row => expandedListData.includes(row.id); 
    const onRowExpandToggled = (state, row) => {
        if (state) {
            return setExpandedListData([...expandedListData, row.id]);
        }
        setExpandedListData(expandedListData.filter(id => id != row.id))
    }


    const deleteCategory = async (row, isMain) => {
        const result = await CategoryService.delete(row.id);
        if(result.status) fetchCategories();
    }

    const editCategory = (data, isMain) => {
        setSelectedID(data.id)
        setModalValues(data)
        if(isMain) setModalTitle('Edit Product Category');
        else setModalTitle('Edit Product Sub Category');
        setIsModalVisible(true);
    }

    const addSubCategory = (id) => {
        setSelectedCategory(id)
        setIsModalVisible(true);
        setModalTitle('Create Product Sub Category');
    }

    const closeModel = () => {
        setIsModalVisible(false);
        setSelectedCategory('')
        setSelectedID('')

    }

    const onSuccess = (data) => {
        setIsModalVisible(false);
        setSelectedCategory('')
        setSelectedID('')
        fetchCategories();
    }

    return (
        <LayoutMain>
            <CreateOrEditModal id={selectedID} values={modalValues} title={modalTitle} category={selectedCategory} open={isModalVisible} onClose={closeModel} onSuccess={onSuccess} />      
            <DataTable
                title={'Product Categories'}
                data={listData}
                columns={columns}
                progressPending={loadingListData}
                progressComponent={<Loader loading={loadingListData} />}
                highlightOnHover
                // dense
                defaultSortFieldId={4}
                // pointerOnHover
                pagination
                expandableRows
                expandableRowExpanded={rowPreExpanded}
                onRowExpandToggled={onRowExpandToggled}
                expandableRowsComponent={({ data }) => <DataTable  title={ <small>{ data.title + ' - sub categories'}</small>} dense columns={subCategoryColumns} theme='solarized'  data={data.subCategories || []} />}

                selectableRows
                contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
            />
        </LayoutMain>
    )
}

