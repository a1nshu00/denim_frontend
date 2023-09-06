import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import CustomizedSwitches from "@components/switch"
import SaveIcon from "@mui/icons-material/Save"
import LoadingButton from "@mui/lab/LoadingButton"
import Fade from '@mui/material/Fade';
import { useState } from "react"
import { useEffect } from "react"
import { ShopService } from "@service"
import Grid from '@mui/material/Grid';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: 550,
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


export default function CreateOrEditModal({ id = false, values = false, product = false, title, open = false, onSuccess, onClose}) {
    const [inputName, setInputName]                   = useState("");
    const [inputContactName, setInputContactName]     = useState("");
    const [inputContactNumber, setInputContactNumber] = useState("");
    const [inputContactEmail, setInputContactEmail]   = useState("");
    // const [inputPassword, setInputPassword]           = useState("");
    const [inputPincode, setInputPincode]             = useState('');
    const [inputCity, setInputCity]                   = useState("");
    const [inputState, setInputState]                 = useState("");
    const [inputAddress1, setInputAddress1]           = useState("");
    const [inputAddress2, setInputAddress2]           = useState("");
    const [inputDetail, setInputDetail]               = useState("");
    const [inputStatus, setInputStatus]               = useState(false)
    
    const [submittingData, setSubmittingData]         = useState(false);



    useEffect( function () {
        if (values && !!id) {
            setInputName(values.name)
            setInputContactName(values.contactName)
            setInputContactNumber(values.contactNumber)
            setInputContactEmail(values.contactEmail)
            setInputPincode(values.pincode)
            setInputCity(values.city)
            setInputState(values.state)
            setInputAddress1(values.address_1)
            setInputAddress2(values.address_2)
            setInputDetail(values.detail)
            setInputStatus(values.status)          
            return
        }

        
        setInputName('')  
        setInputContactName('')  
        setInputContactNumber('')  
        setInputContactEmail('')  
        setInputPincode('')  
        setInputCity('')  
        setInputState('')  
        setInputAddress1('')  
        setInputAddress2('')  
        setInputDetail('')  
        setInputStatus(false)  
    }, [id, product, open, values])


    const handleSubmit = async () => {
        setSubmittingData(true)
        const data  = {name: inputName, contactName: inputContactName, contactNumber: inputContactNumber, contactEmail:inputContactEmail, pincode:inputPincode, city:inputCity, state:inputState, address_1:inputAddress1, address_2:inputAddress2, detail:inputDetail, status: inputStatus}

        if (!!id) data.id = id

        const result = !!id ? await ShopService.update(id, data) : await ShopService.create(data)

        if (result.status) {
            onSuccess(result)
        }
        setSubmittingData(false)
    }


    return (
        <Modal open={open} onClose={onClose} >
            <Fade in={open}>
                <Box sx={{ ...style }}>
                    <h4 id="parent-modal-title">{title}</h4>                
                     <Grid container spacing={2} className="mb-4 mt-0">
                        <Grid item xs={7}>
                            <TextField required label="Name" className="col-12"  value={inputName} onChange={(e) => setInputName(e.target.value)} />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField label="Contact Name" className="col-12" value={inputContactName} onChange={(e) => setInputContactName(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className="mb-4">
                        <Grid item xs={6}>
                            <TextField label="Contact Number"  type="number" className="col-12"  value={inputContactNumber} onChange={(e) => setInputContactNumber(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Contact Email" className="col-12" value={inputContactEmail} onChange={(e) => setInputContactEmail(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className="mb-4">
                        <Grid item xs={4}>
                            <TextField label="Pincode" type="number" className="col-12"  value={inputPincode} onChange={(e) => setInputPincode(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="City" className="col-12"  value={inputCity} onChange={(e) => setInputCity(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField label="State" className="col-12" value={inputState} onChange={(e) => setInputState(e.target.value)} />
                        </Grid>
                    </Grid>

                    <TextField label="Address 1" className="col-12 mb-4" value={inputAddress1} onChange={(e) => setInputAddress1(e.target.value)} />
                    <TextField label="Address 2" className="col-12 mb-4" value={inputAddress2} onChange={(e) => setInputAddress2(e.target.value)} />
                    <TextField label="Detail" className="col-12 mb-4" multiline minRows={1} maxRows={5} value={inputDetail} onChange={(e) => setInputDetail(e.target.value)} />

                    <Grid container>
                        <Grid container xs justifyContent="flex-start" className="ms-2">
                            <CustomizedSwitches name="status" classes={"col-8"} title={"Status"} checked={inputStatus} onChange={(e) => setInputStatus(e.target.checked)} />
                        </Grid>
                        <Grid container xs justifyContent="flex-end">
                            <LoadingButton color="primary" size="small" className="col-4" onClick={handleSubmit} loading={submittingData} loadingPosition="start" startIcon={<SaveIcon />} v1ariant="contained" >
                                <span>Save</span>
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
}
