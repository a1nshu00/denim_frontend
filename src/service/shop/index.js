import Swal from 'sweetalert2'
import { ShopApi } from "@api";
import { enqueueSnackbar } from "notistack"

export default class ShopService {
    static async list(options) {
        const result =  await ShopApi.getAllShops(options)

        if(!result.status){
            enqueueSnackbar(result.message, { variant : 'warning' });
        }

        return result;
    }

    static async get(id) {
        return await ShopApi.getShop(id)
    }

    static async create(data) {
        const result = await ShopApi.createShop(data)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }

    static async update(id, data) {
        const result = await ShopApi.updateShop(id, data)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }


    static async delete(id) {
        const alertResult = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this shop!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!"
        })

        if (!alertResult.isConfirmed) return { status: false }

        const result = await ShopApi.deleteShop(id)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });

        return result;
    }
}
