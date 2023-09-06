import LayoutMain from "@layout/main"
import { useState, useEffect, useMemo, useCallback } from "react"
import { Toast } from "@service"
import { Form, Modal, Card, Loader } from "@components"
import { ProductService, CategoryService } from "@service"
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import DataTable, { createTheme } from "react-data-table-component"
import CreateOrEditModal from "./CreateOrEditModal"
import Action from "./Action"

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import SelectProductPopup from "./product/selectPopup"
import { useSelector, useDispatch } from 'react-redux'
import { OrderService } from "../../service"
import { updateOrderProducts } from '@store/feature/orderProduct.js'

const steps = ['Select products', 'Select address', 'Payment'];

export default function OrderPage() {
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
    const [loadingListData, setLoadingListData]   = useState(true)
    const [orderList, setOrderList]               = useState([])
    const [expandedListData, setExpandedListData] = useState([])
    const [currentOrder, setCurrentOrder]         = useState({});
    const [isEditMode, setIsEditMode]             = useState(false)
    const [isViewMode, setIsViewMode]             = useState(false)

    const totalPrice    = useSelector((state) => state.orderProduct.totalPrice)
    const totalQuantity = useSelector((state) => state.orderProduct.totalQuantity)
    const orderProducts = useSelector((state) => state.orderProduct.orderProducts)
    const dispatch      = useDispatch()


    useEffect(function() {
        fetchOrders()
    }, [])

    const fetchOrders = async () =>{
        setLoadingListData(true)
        const result = await OrderService.list({ shop:true });
        
        if (result.status) {
            setOrderList(result.data);
        } 
        
        setLoadingListData(false)
    }

    const openNewOrderModel = () => {
        setIsOrderModalVisible(true);
    }

    const closeOrderModel = () => {
        setIsOrderModalVisible(false);
        if (isEditMode || isViewMode) {
            setIsEditMode(false);
            setIsViewMode(false);
            setCurrentOrder({});
            dispatch(updateOrderProducts([]));
        }
    }

    const showOrder = (data) => {
        setIsViewMode(true)
        setIsOrderModalVisible(true);
        setCurrentOrder(data);
        dispatch(updateOrderProducts(data.order_items));
    }

    const editOrder = (data) => {
        setIsEditMode(true)
        setIsOrderModalVisible(true);
        setCurrentOrder(data);
        dispatch(updateOrderProducts(data.order_items));
    }

    const orderListColumns = [
        {
            name: "OrderID",
            sortable: true,
            selector: (row) => row.gID,
            grow: 1
        },
        {
            name: "Total Price",
            sortable: true,
            selector: (row) => row.amount,
            cell: (row) => `₹${row.amount}`,
            grow: 1
        },
        {
            name: "Created At",
            sortable: true,
            selector: (row) => row.createdAt,
            grow: 1
        },
        {
            name: "Status",
            sortable: true,
            selector: (row) => getOrderStatus(row),
            grow: 1
        },
        {
            name: "Action",
            sortable: false,
            selector: (row) => row.status,
            cell: (row) => <Action row={row} onDeleteRow={deleteOrder} onShow={showOrder} onEdit={editOrder} isMain={true} />,
            grow:1
        },
    ]

    const orderProductColumns = (orderId) => ([        
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
    ])

    const orderProductVariantColumns = (orderId, productId) => ([        
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
        {
            name: "Quantity",
            sortable: true,
            selector: (row) => row.quantity,
            cell: (row) => `${row.quantity}x`,
            grow:1
        },
        {
            name: "Total Price",
            sortable: true,
            selector: (row) => row.quantity * row.price,
            cell: (row) => `₹${row.quantity * row.price}`,
            grow:1
        },
    ])

    const subHeaderComponentMemo = useMemo(() => {
        return (
           <div style={{ width:"100%", display:"flex", justifyContent:'flex-end', alignItems:"center" }}>
                <Button variant="outlined"  onClick={openNewOrderModel} startIcon={<AddIcon fontSize="small" />}>New Order</Button>
           </div>
        )
    }, []);

    const rowPreExpanded = row => expandedListData.includes(row.id);
    const onRowExpandToggled = (state, row) => {
        if (state) {
            return setExpandedListData([...expandedListData, row.id]);
        }
        setExpandedListData(expandedListData.filter(id => id != row.id))
    }

    const onOrderSubmitted = async (response) => {
        console.log({response})
        await OrderService.confirm(currentOrder.id, {paymentId:'test'});
        fetchOrders()
    }

    const deleteOrder = async (row) => {
        const result = await OrderService.delete(row.id);

        if(result.status) fetchOrders()
    }

    return (
        <LayoutMain>
            <Box sx={{ width: '100%' }}>
                <CreateOrEditModal isViewMode={isViewMode} isEditMode={isEditMode} open={isOrderModalVisible} onClose={closeOrderModel} onSuccess={onOrderSubmitted} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
                {/* <Button onClick={openNewOrderModel}>New Order</Button> */}
                <DataTable
                    title={'All Orders'}
                    data={orderList}
                    striped
                    columns={orderListColumns}
                    progressPending={loadingListData}
                    progressComponent={<Loader loading={loadingListData} />}
                    highlightOnHover
                    defaultSortFieldId={4}
                    // pointerOnHover

                    pagination
                    expandableRows
                    expandableRowExpanded={rowPreExpanded}
                    onRowExpandToggled={onRowExpandToggled}
                    expandableRowsComponent={({ data }) => {
                        const orderID = data.id;
                  
                        return  <Box  bgcolor="white" padding={1}  > 
                            <DataTable 
                                columns={orderProductColumns(orderID)} 
                                theme='solarized'  
                                dense
                                data={data.order_items || []} 
                                expandableRows
                                expandableRowExpanded={rowPreExpanded}
                                onRowExpandToggled={onRowExpandToggled}
                                expandableRowsComponent={({ data }) => <Box  bgcolor="white" padding={2} paddingTop={1}  ><DataTable dense columns={orderProductVariantColumns(orderID, data.id)} theme='solarized2' data={data.variants || []} /></Box> }
                            /> 
                        </Box> 
                    }}

                    selectableRows
                    // contextActions={contextActions}
                    // onSelectedRowsChange={handleRowSelected}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                />
            </Box>
        </LayoutMain>
    )
}


const getOrderStatus = order => {
    if (order.isDraft) {
        return 'Draft'
    } else if (order.status === 0) {
        return 'Placed'
    } else if (order.status === 1) {
        return 'Processing'
    } else if (order.status === 2) {
        return 'Completed'
    }
    return 'Pending'
}