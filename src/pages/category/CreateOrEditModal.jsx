import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import CustomizedSwitches from "@components/switch"
import SaveIcon from "@mui/icons-material/Save"
import LoadingButton from "@mui/lab/LoadingButton"
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';

import { useState } from "react"
import { CategoryService } from "@service"
import { useEffect } from "react"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: 500,
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

export default function CreateOrEditModal({ id = false, values = false, category = false, title, open = false, onSuccess, onClose}) {
    const [inputTitle, setInputTitle]         = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputStatus, setInputStatus]       = useState(false)
    const [submittingData, setSubmittingData] = useState(false)

  
    useEffect( function () {
        if (values && !!id) {
            setInputTitle(values.title)
            setInputDescription(values.description)
            setInputStatus(values.status)
            return
        }

        setInputTitle("")
        setInputDescription("")
        setInputStatus(false)
    }, [id, category, open, values])

    const handleSubmit = async () => {
        setSubmittingData(true)
        const data = {title: inputTitle, description: inputDescription, status: inputStatus}

        if (!!id) data["id"] = id
        if (!!category) data["category"] = category

        const result = !!id ? await CategoryService.update(id, data) : await CategoryService.create(data)

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
                    <TextField required label="Title" className="col-12 mb-4 mt-3" name="title" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
                    <TextField label="Description" className="col-12 mb-4" name="description" multiline minRows={3} maxRows={5} value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />


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
