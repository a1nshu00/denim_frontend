import {ProductApi} from "@api";
import Toast from "@service/Toast";
import Swal from 'sweetalert2'
import {  enqueueSnackbar } from "notistack"

export default class ProductService {
    static async list(options) {
        const result = await ProductApi.getAllProducts(options)

        if(!result.status){
            enqueueSnackbar(result.message, { variant : 'warning' });
        }

        return result;
    }

    static async get(id) {
        return await ProductApi.getProduct(id)
    }

    static async create(data) {
        const result = await ProductApi.createProduct(data)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }

    static async update(id, data) {
        const result = await ProductApi.updateProduct(id, data)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }

    static async delete(id) {
        const alertResult = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!"
        })

        if (!alertResult.isConfirmed) return { status: false }

        const result = await ProductApi.deleteProduct(id)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }
}