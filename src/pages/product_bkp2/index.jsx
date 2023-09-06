import LayoutMain from "@layout/main"
import { useState, useEffect } from "react"
import { SmartTable } from "@components"
import { Toast } from "@service"
import ProductApi from "@api/product"
import { Form, Modal } from "@components"
import { ProductService } from "@service"
import Swal from 'sweetalert2'

function onClickFunction(id) {
    Toast.dispatch({
        type: "danger",
        title: `Product ${id} updated successfilly`,
    })
}



//     "status" : false,
//     "category" : "64db49a72414d581aee40995",
//     "sub_category" : "64db49a72414d581aee4099b",
//     "price" : 81234500,
//     "quantity": 120,
//     "buy_price" : 100,
//     "sell_price" : 1100

const formInputs = [
    {
        title: "Name",
        name: "name",
        type: "text",
        id: "name",
        classes: "name",
        placeholder: "Enter product name",
        col: 8,
    },
    {
        title: "Category",
        name: "category",
        type: "text",
        id: "category",
        classes: "category",
        placeholder: "Select category",
        col: 2,
    },
    {
        title: "Sub Category",
        name: "subCategory",
        type: "text",
        id: "subCategory",
        classes: "subCategory",
        placeholder: "select sub category",
        col: 2,
    },
    {
        title: "Description",
        name: "description",
        type: "textarea",
        id: "description",
        classes: "description",
        placeholder: "Enter product description",
        col: 12,
    },
    {
        title: "Price",
        name: "product_price",
        selector: "price",
        type: "number",
        id: "price",
        classes: "price",
        placeholder: "Enter product price",
        col: 3,
    },
    {
        title: "Quantity",
        name: "quantity",
        type: "number",
        id: "quantity",
        classes: "quantity",
        placeholder: "Enter product quantity",
        col: 3,
    },
    {
        title: "SKU",
        name: "sku",
        type: "text",
        id: "sku",
        classes: "sku",
        placeholder: "Enter product SKU",
        col: 4,
    },
    {
        title: "Status",
        name: "status",
        type: "switch",
        id: "status",
        classes: "status mb-3",
        col: 2,
    },
    {
        title: "Product varients",
        type: "tableinput",
        name: "varients",
        id: "name",
        classes: "name",
        col: 12,
        inputs: [
            {
                name: "varient_id",
                selector: "id",
                type: "hidden",
            },
            {
                title: "SKU",
                name: "varient_sku",
                selector: "sku",
                type: "text",
                classes: "sku",
                placeholder: "Enter product sku",
            },
            {
                title: "Color",
                name: "color",
                type: "text",
                classes: "size",
                placeholder: "Enter product color",
            },
            {
                title: "Size",
                name: "size",
                type: "text",
                classes: "size",
                placeholder: "Enter product size",
            },
            {
                title: "Price",
                name: "price",
                type: "number",
                classes: "price",
                placeholder: "Enter product price",
            },
            {
                title: "Quantity",
                name: "Quantity",
                type: "number",
                classes: "quantity",
                placeholder: "Enter product quantity",
            },
        ],
    },
]

function ProductPage() {
    const [modalVisible, setModalVisible] = useState(false)
    const [isCreateModel, setIsCreateModel] = useState(true)
    const [formValues, setformValues]     = useState({})
    const [lastUpdated, setLastUpdated]   = useState(false)

    // useEffect(function () {

    // }, [])

    const updateTable = () =>  setLastUpdated(new Date().toLocaleString());;

    const onSubmit = async (data) => {
        const response = await ProductService.create(data);
        if (response.status){
            setModalVisible(false)
            updateTable();
        }
    }

    const columns = [
        { name: "id", selector: (row) => row.gID },
        { name: "name", selector: (row) => row.name },
        { name: "description", selector: (row) => row.description },
        { name: "Staus",  selector: (row) => (row.status ? "Active" : "Inactive"), badge: (row) => (row.status ? "success" : "secondary") },
        { name: "Action", selector: (row) => row.id,
            action: [
                { name: "Edit", onClick: (selector)   => editProduct(selector), icon: <i className="bx bx-edit-alt me-1"></i> },
                { name: "Delete", onClick: (selector) => deleteProduct(selector), icon: <i className="bx bx-trash me-1"></i> },
            ],
        },
    ]

    const editProduct = async (id) => {
        setIsCreateModel(false);
        const result = await ProductService.get(id);
        setModalVisible(true);
        // if (result.status) updateTable();
    }

    const deleteProduct = async (id) => {
        const result = await ProductService.delete(id);
        if (result.status) updateTable();
    }

    const createBtn = (<button onClick={() => { setIsCreateModel(true); setModalVisible(true); setformValues({}) }}>create</button>)

    return (
        <LayoutMain>
            <SmartTable
                api={ProductService.list}
                apiOptions={{ limit:10, pagination:false }}
                caption="List of Products"
                columns={columns}
                title="Products"
                update={lastUpdated}
                header={createBtn}
            />
            <Modal
                visible={modalVisible}
                title={"Create Product"}
                modelClosed={() => setModalVisible(false)}
                fullScreen
            >
                <Form
                    inputs={formInputs}
                    values={formValues}
                    flex
                    onSubmit={(data)=> onSubmit(data)}
                />
            </Modal>
        </LayoutMain>
    )
}

export default ProductPage
