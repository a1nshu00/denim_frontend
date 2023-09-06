import Box from "@mui/material/Box"

import { useSelector, useDispatch } from 'react-redux'
// import { updateSelectedProducts } from '@store/feature/productPopup.js'
import { removeOrderProduct, updateOrderItemQuantity } from '@store/feature/orderProduct.js'
import { useEffect, useState } from "react"

import Typography from '@mui/material/Typography';


import DataTable from "react-data-table-component"
import { Button, Card, TextField } from "@mui/material"
import SelectProductPopup from "../product/selectPopup"
import AddIcon from '@mui/icons-material/Add';

import Grid from '@mui/material/Grid';


export default function OrderItems({isViewMode}) {
    const [expandedListData, setExpandedListData]           = useState([])
    const [focusedInput, setFocusedInput]                   = useState('');
    const [isProductModalVisible, setIsProductModalVisible] = useState(false)
    const orderProducts = useSelector((state) => state.orderProduct.orderProducts)
    const totalPrice    = useSelector((state) => state.orderProduct.totalPrice)
    const totalQuantity = useSelector((state) => state.orderProduct.totalQuantity)
    const totalProducts = useSelector((state) => state.orderProduct.totalProducts)

    const dispatch      = useDispatch()

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            cell: (row) => (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end", width: '100%' }}>
                    <Typography variant="body2" style={{ textTransform:"capitalize" }} >{row.name}</Typography>
                    <Typography variant="caption" style={{ fontSize:10, }} >{row.gID}</Typography>
                </Box>),
            sortable: true,
            grow: 2
        },
        {
            name: "Variants",
            sortable: true,
            selector: (row) => row.variants.length,
            grow: 1
        },
        {
            name: "Qty",
            sortable: true,
            selector: (row) => row.quantity,
            cell: (row) => `${row.quantity}x`,
            grow: 1
        },
        {
            name: "Total Price",
            sortable: true,
            selector: (row) => row.price,
            cell: (row) => `₹${row.price}`,
            grow: 1
        },
    ]

    const subItemColumns = (productId) => ([        
        {
            name: "Name",
            selector: (row) => row.name,
            cell: (row) => (<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-end", width: '100%' }}>
                    <Typography variant="body2" style={{ textTransform:"capitalize" }} >{row.name}</Typography>
                    <Typography variant="caption" style={{ fontSize:10, }} >{row.sku}</Typography>
                </Box>),
            sortable: true,
            grow: 2
        },
        {
            name: "Color/Size",
            selector: (row) => `${row.color}/${row.size}`,
            grow:3    
        },
        {
            name: "Price x Quantity",
            selector: (row) => row.price,
            cell: (row) => (<Box sx={{ display: 'flex', flexDirection:"row", justifyContent: "center", alignItems:"center", }}>
                    <Typography variant="body2" style={{ textTransform:"capitalize", minWidth:30, }}>₹{row.price}</Typography>
                    <Typography variant="caption" style={{ fontSize:10 }}  className="me-1 ms-1"> X </Typography>
                    <Box sx={{ display: 'flex', flexDirection:"row", justifyContent: "flex-start", width: 100, }} >
                        { isViewMode === true ? 
                            <Typography variant="body2" style={{ textTransform:"capitalize", minWidth:30, }}>{row.quantity}</Typography> 
                            : <TextField size="small" type="number" value={row.quantity} variant="standard" // <== changed this
                                onChange={(e) => updateOrderItemQty(productId, row.id, e.target.value)} onFocus={() => setFocusedInput(row.id)} inputRef={input => {if (focusedInput == row.id) {input && input.focus();}}}
                                inputProps={{ style: { height:'25px',  width: "60px", padding: '0 0 0 5px' } }} 
                            />
                        }
                    </Box>
                </Box>),
            sortable: true,
            grow: 4
        },

        {
            name: "Total",
            sortable: true,
            selector: (row) => row.quantity * row.price,
            cell: (row) => `₹${row.quantity * row.price}`,
            grow: 1
        },  ... (isViewMode === true ? [{ }] : [{
            name: "Remove",
            sortable: true,
            selector: (row) => row.price,
            cell: (row) => <button type="button" onClick={() => removeOrderItem(productId, row.id)} className="btn btn-sm btn-danger ms-3">x</button>,
            grow: 1
        }]),
    ])

    const removeOrderItem = (id, variantId = false) => {
        dispatch(removeOrderProduct({ id, variantId }));
    }

    const updateOrderItemQty = (id, variantId, quantity) => {
        dispatch(updateOrderItemQuantity({ id, variantId, quantity }));
    }

    const rowPreExpanded = row => expandedListData.includes(row.id);
    const onRowExpandToggled = (state, row) => {
        if (state) {
            return setExpandedListData([...expandedListData, row.id]);
        }
        setExpandedListData(expandedListData.filter(id => id != row.id))
    }


    const openProductModel = () => {
        setIsProductModalVisible(true);
    }

    const onCloseProductModel = () => {
        setIsProductModalVisible(false);
    }

    return (
        <Box>
            <SelectProductPopup open={isProductModalVisible} onClose={onCloseProductModel} />
            {orderProducts.length !== 0 && (
                <Grid container justifyContent="flex-start" className="mb-0">
                    <Grid item xs>
                        { isViewMode === false && <Button variant="outlined" onClick={openProductModel} size="small" startIcon={<AddIcon fontSize="small" />}>Add Product</Button> }
                    </Grid>
                    <Grid item xs >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end", width: '100%' }}>
                            <Typography variant="subtitle2" className="me-4">Product : {totalProducts} ({totalQuantity}x)</Typography>
                            <Typography variant="subtitle2" >Total  : ₹{totalPrice}</Typography>
                        </Box>
                    </Grid>
                </Grid>)
            }

            {orderProducts.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: 100, width: '100%', }} className="mt-4 mb-5">
                        <Button variant="outlined" onClick={openProductModel} startIcon={<AddIcon fontSize="small" />}>Select Products</Button>
                    </Box>
                ):(<DataTable
                    data={orderProducts}
                    striped
                    columns={columns}
                    highlightOnHover
                    expandableRows
                    expandableRowExpanded={rowPreExpanded}
                    onRowExpandToggled={onRowExpandToggled}
                    expandableRowsComponent={({ data }) => <Card><DataTable dense columns={subItemColumns(data.id)} theme='solarized' data={data.variants || []} /></Card>}
                />)
            }
        </Box>
    )
}

