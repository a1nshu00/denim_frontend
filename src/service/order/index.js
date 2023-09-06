import Swal from 'sweetalert2'
import { OrderApi } from "@api";
import { enqueueSnackbar } from "notistack"

export default class OrderService {
    static async list(options) {
        const result =  await OrderApi.getAllOrders(options)

        if(!result.status){
            enqueueSnackbar(result.message, { variant : 'warning' });
        }

        return result;
    }

    static async get(id) {
        return await OrderApi.getOrder(id)
    }

    static async create(data) {
        const result = await OrderApi.createOrder(data)

        if(!result.status){
            enqueueSnackbar(result.message, { variant : 'warning' });
        }
        
        return result;
    }

    static async update(id, data) {
        const result = await OrderApi.updateOrder(id, data)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }

    static async confirm(id, data) {
        const result = await OrderApi.confirmOrder(id, data)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }

    static async createTransaction(id) {
        const result = await OrderApi.createOrderTransaction(id)

        if(!result.status){
            enqueueSnackbar(result.message, { variant : 'warning' });
        }
        
        return result;
    }

    static async delete(id) {
        const alertResult = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!"
        })

        if (!alertResult.isConfirmed) return { status: false }

        const result = await OrderApi.deleteOrder(id)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }
}
