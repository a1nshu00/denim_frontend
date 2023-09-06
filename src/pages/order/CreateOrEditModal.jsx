import { useState, useEffect, useMemo, useCallback } from "react"
import useRazorpay from "react-razorpay";

import {Box, Modal, Fade, Stepper, Step, StepLabel, Button, Typography} from "@mui/material"
import {LoadingButton} from '@mui/lab';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import { OrderService } from "@service"
import { useSelector, useDispatch } from 'react-redux'
import { resetToInitialState } from '@store/feature/orderProduct.js'
import { enqueueSnackbar } from "notistack"

import OrderItems from "./items";
import AddressBox from "./address";

const steps     = ['Select products', 'Select address', 'Payment'];
const viewSteps = ['Products', 'Address', 'Payment'];
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: 1000,
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


export default function CreateOrEditModal({ id = false, isViewMode=false, isEditMode=false, values = false, product = false, title, open = false, onSuccess, onClose, currentOrder, setCurrentOrder }) {
    const [activeStep, setActiveStep]   = useState(0);
    const [isOrderPaid, setIsOrderPaid] = useState(false);
    const [creatingOrderTransaction, setCreatingOrderTransaction] = useState(false);
 

    const totalPrice    = useSelector((state) => state.orderProduct.totalPrice)
    const totalQuantity = useSelector((state) => state.orderProduct.totalQuantity)
    const orderProducts = useSelector((state) => state.orderProduct.orderProducts)
    const dispatch      = useDispatch()
    const [Razorpay]    = useRazorpay();


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(function(){
        setActiveStep(0);
    }, [isViewMode, isEditMode])


    const createOrUpdateAddress = () => {
        setIsOrderPaid(true);
        if(isViewMode) setActiveStep((prevActiveStep) => prevActiveStep + 2);
        else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const onOrderSuccess = response => {
        console.log('rozerpay response', response)     
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        dispatch(resetToInitialState())
        onSuccess(response)
        setCreatingOrderTransaction(false);
        setTimeout(() => {
            onClose();
            setActiveStep(0);
            setIsOrderPaid(false);
            setCurrentOrder({});
        }, 15000);
    }
    const onOrderPaymentFailed = response => {
        setCreatingOrderTransaction(false)
        console.log('rozerpay payment failed', response)
    }

    const onOrderPaymentCancel = response => {
        setCreatingOrderTransaction(false)
        console.log('rozerpay payment cancel', response)
    }

    const createOrUpdateOrder = async () => {
        if(isViewMode) {
            return setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

        const orderRequest    = {}
        orderRequest.products = orderProducts.map(product => ({id: product.id, variants: product.variants.map(variant => ({ id: variant.id, quantity: variant.quantity })) }))

        const result          = !!currentOrder.id ? await OrderService.update(currentOrder.id, orderRequest) : await OrderService.create(orderRequest);
        
        console.log({ result });
        
        if (result.status) {
            setCurrentOrder(result.data);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }


    const handlePayment = async (params) => {
        if(isViewMode) {
            return setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        setCreatingOrderTransaction(true)
        const transaction     = await OrderService.createTransaction(currentOrder.id);

        if(!transaction.status) {
            setCreatingOrderTransaction(false)
            enqueueSnackbar(transaction.message, { variant : 'error' });
            return;
        }

        const paymentHandler  = new Razorpay({
            key: "rzp_test_A7mgEK3K3YNDLa",
            amount: transaction.data.amount, 
            currency: "INR",
            name: "Denim Hike",
            description: "Test Transaction",
            // image: "https://example.com/your_logo",
            order_id: transaction.data.id,
            handler: onOrderSuccess,
            prefill: { name: "Piyush Garg",  email: "youremail@example.com", contact: "9999999999" },
            notes: { address: "Razorpay Corporate Office" },
            theme: { color: "#007bff" },
            modal:{ escape: false, ondismiss: onOrderPaymentCancel }
        });

        paymentHandler.on("payment.failed", onOrderPaymentFailed);
        // paymentHandler.on("payment.cancel", onOrderPaymentCancel);
        paymentHandler.open();
    };

    return (
        <Modal open={open} onClose={onClose} >
            <Fade in={open}>
                <Box sx={{ ...style }}>
                    <Stepper activeStep={activeStep} className="mt-4">
                        {( isViewMode ===true ? viewSteps : steps ).map((label, index) => {
                            const stepProps = {};
                            // if (isStepSkipped(index)) stepProps.completed = false;
                            return (<Step key={label} {...stepProps}><StepLabel >{label}</StepLabel></Step>);
                        })}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Box sx={{ width: '100%', display:'flex', justifyContent:"center", alignItems:"center", padding:5, paddingTop:10, flexDirection:'column' }}>
                            <Typography variant="h4" style={{ textTransform:"uppercase", }}>  THANK YOU </Typography>
                            <Typography  variant="subtitle1" className="mb-3 mt-3" >  Your order {currentOrder.gID} has beed received </Typography>
                            {isViewMode === false && <Typography variant="caption" > We will get back to you as soon as possible </Typography> }
                            {isViewMode === true && <Button className="mt-4" onClick={() => setActiveStep(currentStep => currentStep-2)}>Back</Button>}
                        </Box>
                    )}
                    {activeStep == 0 && (
                        <Box sx={{ width: '100%', pt: 4 }}>
                            <OrderItems isViewMode={isViewMode} />
                            {orderProducts.length !== 0 && (
                                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }} className="mt-4">
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={createOrUpdateOrder}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
                                </Box>
                            )}
                        </Box>
                    )}
                    {activeStep == 1 && (
                        <>
                            <AddressBox isViewMode={isViewMode} />
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '100%' }}>
                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}> Back </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={createOrUpdateAddress}>Next</Button>
                            </Box>
                        </>
                    )}
                    {activeStep == 2 && (
                        <Box sx={{ width: '100%', pt: 4 }}>
                            <Box sx={{ width: '100%', justifyContent:"center", alignItems:"center", display:"flex", height:150 }}>
                                <LoadingButton color="primary" size="small" 
                                onClick={()=>handlePayment()} loading={creatingOrderTransaction} 
                                loadingPosition="start" 
                                startIcon={<CurrencyRupeeIcon />}
                                    v1ariant="contained" >
                                    <span>Make Payment</span>
                                </LoadingButton>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width: '100%' }}>
                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}> Back </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                {/* <Button onClick={payOrder}>Pay</Button> */}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Fade>
        </Modal>
    )
}


