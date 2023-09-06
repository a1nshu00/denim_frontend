import LayoutMain from "@layout/main"
import { useState, useEffect, useMemo , useCallback} from "react"
import { Toast } from "@service"
import { Form, Modal, Card, Loader } from "@components"
import { ProductService, CategoryService } from "@service"
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import DataTable,  { createTheme } from "react-data-table-component"
import CreateOrEditModal from "./CreateOrEditModal"
import Action from "./Action"
// import Tooltip from "../../components/tooltip"

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

// const QuantityBox = ({title, text}) => {
//     return <Tooltip>
//         <>
//             <Typography color="red">Quantity reached to critical level</Typography>
//             <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
//             {"It's very engaging. Right?"}
//         </>
//     </Tooltip>
// }

export default function ProductPage() {
    const [listData, setListData] = useState([])
    const [expandedListData, setExpandedListData] = useState([])
    const [loadingListData, setLoadingListData] = useState(true)

    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);

    const [selectedID, setSelectedID] = useState('')
    const [selectedItem, setSelectedItem] = useState('')
    
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalValues, setModalValues]    = useState({})
    const [modalTitle, setModalTitle]      = useState('Create Product')


    useEffect(() => {
        fetchItems()
    }, [])

    const fetchItems = async () =>{
        setLoadingListData(true)
        const result = await ProductService.list({ variants:true, category:true, subCategory:true });
        
        if (result.status) {
            setListData(result.data);
        } 
        
        setLoadingListData(false)
    }
 
    const columns = [
        {
            name: "ID",
            selector: (row) => row.gID,
            sortable: true,
            grow:1
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            grow:3
        },
        {
            name: "SKU",
            sortable: true,
            selector: (row) => row.sku,
            grow:2
        },
        {
            name: "Price",
            sortable: true,
            selector: (row) => row.price,
            cell: (row) => `₹${row.price}`,
            grow:1
        },
        {
            name: "Qty",
            sortable: true,
            selector: (row) => row.quantity,
            cell: (row) => `${row.quantity}x`,
            grow:1
        },
        {
            name: "Variants",
            sortable: true,
            selector: (row) => row.variants.length,
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
            cell: (row) => <Action row={row} addVariant={addVariant} onDeleteRow={deleteItem} onEdit={editItem} isMain={true} />,
            grow:1
        },
    ]
     
    const subItemColumns = (productId) => ([
        {
            name: "ID",
            selector: (row) => row.gID,
            sortable: true,
            grow:1
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            grow:3
        },
        {
            name: "SKU",
            sortable: true,
            selector: (row) => row.sku,
            grow:2
        },
        // {
        //     name: "Description",
        //     sortable: true,
        //     selector: (row) => row.description,
        //     grow:4
        // },
        {
            name: "Color",
            sortable: true,
            selector: (row) => row.color,
            grow:1
        },
        {
            name: "Size",
            sortable: true,
            selector: (row) => row.size,
            grow:1
        },
        {
            name: "Price",
            sortable: true,
            selector: (row) => row.price,
            cell: (row) => `₹${row.price}`,
            grow:1
        },
        {
            name: "Qty",
            sortable: true,
            selector: (row) => row.quantity,
            cell: (row) =>  row.quantity <= row.alertQuantity ? <b>{row.quantity}x</b> : <span>{row.quantity}x</span>,
            grow:1
        },
        {
            name: "Status",
            sortable: true,
            selector: (row) => row.status,
            cell: (row) => <span className={`badge bg-label-${row.status ? 'success' : 'secondary'} me-1`}>{row.status ? 'Active' : 'Inactive'}</span> ,
        },
        // {
        //     name: "Created At",
        //     sortable: true,
        //     selector: (row) => row.createdAt,
        //     grow:3
        // },
        {
            name: "Action",
            sortable: true,
            selector: (row) => row.status,
            cell: (row) => <Action row={row} product={productId} onDeleteRow={deleteItem}  onEdit={editItem}  />,
        },
    ])

    const conditionalRowStyles = [
        {
          when: row => row.quantity <= row.alertQuantity,
          style: {
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
        // You can also pass a callback to style for additional customization
        // {
        //   when: row => row.calories < 400,
        //   style: row => ({ backgroundColor: row.isSpecial ? 'pink' : 'inerit' }),
        // },
      ];

 
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
        setModalTitle('Create Product');
    }

    const subHeaderComponentMemo = useMemo(() => {
        return (
           <div style={{ width:"100%", display:"flex", justifyContent:'flex-end', alignItems:"center" }}>
                <Button variant="outlined"  onClick={openModel} startIcon={<AddIcon fontSize="small" />}>New Product</Button>
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


    const deleteItem = async (row, isMain) => {
        const result = await ProductService.delete(row.id);
        if(result.status) fetchItems();
    }

    const editItem = (data, isMain, product) => {
        setSelectedID(data.id)
        setModalValues(data)
        if(isMain) setModalTitle('Edit Product');
        else {
            setModalTitle('Edit Product Variant');
            setSelectedItem(product);
        }
        setIsModalVisible(true);
    }

    const addVariant = (id) => {
        setSelectedItem(id)
        setIsModalVisible(true);
        setModalTitle('Create Product Variant');
    }

    const closeModel = () => {
        setIsModalVisible(false);
        setSelectedItem('')
        setSelectedID('')
    }

    const onSuccess = (data) => {
        setIsModalVisible(false);
        setSelectedItem('')
        setSelectedID('')
        fetchItems();
    }

    return (
        <LayoutMain>
            <CreateOrEditModal id={selectedID} values={modalValues} title={modalTitle} product={selectedItem} open={isModalVisible} onClose={closeModel} onSuccess={onSuccess} />      
            <DataTable
                title={'All Products'}
                data={listData}
                striped
                columns={columns}
                progressPending={loadingListData}
                progressComponent={<Loader loading={loadingListData} />}
                highlightOnHover
                defaultSortFieldId={4}
                // pointerOnHover
                
                pagination
                expandableRows
                expandableRowExpanded={rowPreExpanded}
                onRowExpandToggled={onRowExpandToggled}
                expandableRowsComponent={({ data }) => <Card><DataTable   dense columns={subItemColumns(data.id)}  conditionalRowStyles={conditionalRowStyles} theme='solarized'  data={data.variants || []} /></Card> }

                selectableRows
                contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
            />
        </LayoutMain>
    )
}

