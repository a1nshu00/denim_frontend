import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import CustomizedSwitches from "@components/switch"
import SaveIcon from "@mui/icons-material/Save"
import LoadingButton from "@mui/lab/LoadingButton"
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { useState } from "react"
import { useEffect } from "react"
import { ProductService } from "@service"
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';

import InputLabel from '@mui/material/InputLabel';
import { CategoryService } from "../../service"


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
    const [inputName, setInputName]         = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [inputCategory, setInputCategory]   = useState("")
    const [inputSubCategory, setInputSubCategory]   = useState("")
    const [inputSKU, setInputSKU]             = useState("")
    const [inputPrice, setInputPrice]         = useState("")
    const [inputColor, setInputColor]         = useState("")
    const [inputSize, setInputSize]           = useState("")
    const [inputQuantity, setInputQuantity]   = useState(1);
    const [inputLowQuantity, setInputLowQuantity] = useState(1);
    const [inputStatus, setInputStatus]       = useState(false);
    const [submittingData, setSubmittingData] = useState(false);

    const [categories, setCategories]         = useState([]);
    const [subCategories, setSubCategories]   = useState([]);

    useEffect( function () {
        if (values && !!id) {
            setInputName(values.name)
            setInputDescription(values.description)
            setInputStatus(values.status)
            setInputSKU(values.sku)
            setInputPrice(values.price)
            setInputColor(values.color)
            setInputSize(values.size)
            setInputQuantity(Number(values.quantity))
            setInputLowQuantity(Number(values.alertQuantity))

            if (!!values.category) {
                if (open) fetchCategories((data) => {
                    // setCategories(data)
                    changeCategory(values.category?.id)
                    if(!!values.subCategory) setInputSubCategory(values.subCategory.id)                   
                })
            }
            return
        }


        if(open) fetchCategories();

        setInputName("")
        setInputCategory("")
        setInputSubCategory('')
        setInputDescription("")
        setInputSKU('')
        setInputPrice('')
        setInputColor('')
        setInputSize('')
        setInputQuantity(1)
        setInputLowQuantity(1)
        setInputStatus(false)  
    }, [id, product, open, values])


    const fetchCategories = async (callback = false) => {
        const result = await CategoryService.list({ subCategory:true });

        if(result.status){
            setCategories(result.data);
            setSubCategories([]);

            if(callback !== false) callback(result.data);
            return;
        }

        if(!result.status){
            enqueueSnackbar(result.message, { variant : 'warning' });
        }
    }

    const handleSubmit = async () => {
        setSubmittingData(true)
        const data = {name: inputName, description: inputDescription, price:inputPrice, sku:inputSKU, status: inputStatus}

        if (!!id) data["id"] = id

        if (!!product) {
            Object.assign(data, {product, color:inputColor, size:inputSize, quantity:inputQuantity, alertQuantity:inputLowQuantity })
        }

        if (!!inputCategory)    data["category"] = inputCategory
        if (!!inputSubCategory) data["subCategory"] = inputSubCategory

        const result = !!id ? await ProductService.update(id, data) : await ProductService.create(data)

        if (result.status) {
            onSuccess(result)
        }
        setSubmittingData(false)
    }

    const changeCategory = (category) => {
        setInputCategory(category);
        const subCategoryList = categories.find((cat)=> category == cat.id );
        setSubCategories( !!subCategoryList ?  subCategoryList.subCategories : []);
    }

    return (
        <Modal open={open} onClose={onClose} >
            <Fade in={open}>
                <Box sx={{ ...style }}>
                    <h4 id="parent-modal-title">{title}</h4>
                    <TextField required label="Name" className="col-12 mb-4 mt-3" name="title" value={inputName} onChange={(e) => setInputName(e.target.value)} />

                    <TextField label="Description" className="col-12 mb-3" name="description" multiline minRows={3} maxRows={5} value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
                    { !!product ? <Grid container spacing={2} className="mb-4">
                        <Grid item xs={6}>
                            <TextField label="Color" className="col-12" name="color"  value={inputColor} onChange={(e) => setInputColor(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Size" className="col-12" name="size"  value={inputSize} onChange={(e) => setInputSize(e.target.value)} />
                        </Grid>
                    </Grid> : <Grid container spacing={2} className="mb-4">
                        <Grid item xs={6}>
                            <FormControl className="col-12">
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category-select"
                                    value={inputCategory}
                                    label="Category"
                                    onChange={(e) => changeCategory(e.target.value)}
                                >
                                    {categories.map((cat, i)=> <MenuItem key={i}  value={cat.id}>{cat.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className="col-12">
                                <InputLabel id="sub-category-label">Sub Category</InputLabel>
                                <Select
                                    labelId="sub-category-label"
                                    id="sub-category-select"
                                    value={inputSubCategory}
                                    label="Category"
                                    onChange={(e) => setInputSubCategory(e.target.value)}
                                >
                                    {subCategories.map((cat, i)=> <MenuItem key={i} value={cat.id}>{cat.title}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid> }
                    
                    {/* ////// start sku and price /// */}
                    <Grid container spacing={2} className="mb-4">
                        <Grid item xs={6}>
                            <TextField label="SKU" className="col-12" name="sku"  value={inputSKU} onChange={(e) => setInputSKU(e.target.value)}  inputProps={{ style: { textTransform: "uppercase" } }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Price" type="number" className="col-12" name="price"  value={inputPrice} onChange={(e) => setInputPrice(e.target.value)} />
                        </Grid>
                    </Grid>
                    {/* ////// end sku and price /// */}

                    {/* ////// start quantity /// */}
                    { !!product && <Grid container spacing={2} className="mb-4">
                        <Grid item xs={6}>
                            <TextField label="Quantity" type="number" className="col-12" name="quantity"  value={inputQuantity} onChange={(e) => setInputQuantity(e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Low Quantity Alert" type="number" className="col-12" name="lowQuantity"  value={inputLowQuantity} onChange={(e) => setInputLowQuantity(e.target.value)} />
                        </Grid>
                    </Grid> }
                    {/* //////end quantity ////// */}
                
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
