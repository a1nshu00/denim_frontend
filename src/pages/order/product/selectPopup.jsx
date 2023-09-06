import { useState, useEffect, useMemo , useCallback} from "react"
import { Card, Loader } from "@components"
import { ProductService } from "@service"
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from '@mui/material/Fade';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable,  { createTheme } from "react-data-table-component"
import CheckIcon from '@mui/icons-material/Check';
// import Tooltip from "../../components/tooltip"

import { useSelector, useDispatch } from 'react-redux'
// import { updateSelectedProducts } from '@store/feature/productPopup.js'
import { updateOrderProducts } from '@store/feature/orderProduct.js'
import { Button, Typography } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: 900,
    minWidth: 300,
    // maxHeight:400,
    // height:"80%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    pt: 5,
    px: 5,
    pb: 5,
    borderRadius: 1,
}

export default function SelectProductPopup({ open = true, onClose }) {
    const [listData, setListData]                 = useState([])
    const [expandedListData, setExpandedListData] = useState([])
    const [loadingListData, setLoadingListData]   = useState(true)
    const [selectedProducts, setSelectedProducts] = useState(true)

    // const selectedProducts  = useSelector((state) => state.orderProductPopup.selectedProducts)
    const dispatch = useDispatch()

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
            name: "Name",
            selector: (row) => row.name,
            cell: (row) => (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end", width: '100%' }}>
                    <Typography variant="body2" noWrap style={{ textTransform:"capitalize" }} >{row.name}</Typography>
                    <Typography variant="caption" noWrap style={{ fontSize:10, }} >{row.gID}</Typography>
                </Box>),
            sortable: true,
            grow: 2
        }, 
        {
            name: "Category",
            selector: (row) => row.category ? row.category.title : '',
            cell: (row) => (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end", width: '100%' }}>
                    <Typography variant="body2" style={{ textTransform:"capitalize" }} noWrap >{row.category.title}</Typography>
                    <Typography variant="caption" noWrap style={{ fontSize:10, }} >{row.subCategory.title}</Typography>
                </Box>),
            sortable: true,
            grow: 2
        },
        {
            name: "Variants",
            sortable: true,
            selector: (row) => row.variants.length,
            grow:1
        },
    ]
     
    const subItemColumns = (productId) => ([
        {
            name: "Name",
            selector: (row) => row.name,
            cell: (row) => (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end", width: '100%' }}>
                    <Typography variant="body2" noWrap style={{ textTransform:"capitalize" }} >{row.name}</Typography>
                    <Typography variant="caption" noWrap style={{ fontSize:10, }} >{row.sku}</Typography>
                </Box>),
            sortable: true,
            grow: 2
        },
        {
            name: "Color/Size",
            selector: (row) => `${row.color}/${row.size}`,
            grow:2  
        },
        {
            name: "Price",
            sortable: true,
            selector: (row) => row.price,
            cell: (row) => `₹${row.price}`,
            grow:1
        },
    ])


    const handleRowSelected = useCallback(state => {
        setSelectedProducts(state.selectedRows);
	}, []);

    const contextActions = useMemo(() => {
        const handleSelect = () => {
            dispatch(updateOrderProducts(selectedProducts));
            onClose(selectedProducts);
        };

        return (<Button variant="outlined" size="small" onClick={handleSelect} startIcon={<CheckIcon fontSize="small" />}>Select Products</Button> );
	}, [listData, selectedProducts]);

    
    const rowPreExpanded   = row => expandedListData.includes(row.id); 
    const onRowExpandToggled = (state, row) => {
        if (state) {
            return setExpandedListData([...expandedListData, row.id]);
        }
        setExpandedListData(expandedListData.filter(id => id != row.id))
    }


    return (
        <Modal open={open} onClose={onClose} >
            <Fade in={open}>
                <Box sx={{ ...style }}>
                    <DataTable
                        title={'All Products'}
                        data={listData}
                        striped
                        columns={columns}
                        progressPending={loadingListData}
                        progressComponent={<Loader loading={loadingListData} />}
                        highlightOnHover

                        pagination
                        expandableRows
                        expandableRowExpanded={rowPreExpanded}
                        onRowExpandToggled={onRowExpandToggled}
                        expandableRowsComponent={({ data }) => <Card><DataTable   dense columns={subItemColumns(data.id)} theme='solarized'  data={data.variants || []} /></Card> }

                        selectableRows
                        // selectableRowSelected={rowSelectCritera}
                        contextActions={contextActions}
                        onSelectedRowsChange={handleRowSelected}
                    />
                </Box>
            </Fade>
        </Modal>
    )
}

