import Toast from "@service/Toast";
import Swal from 'sweetalert2'
import {CategoryApi} from "@api";
import {  enqueueSnackbar } from "notistack"

export default class CategoryService {
    static async list(options) {
        const result =  await CategoryApi.getAllCategories(options)

        if(!result.status){
            enqueueSnackbar(result.message, { variant : 'warning' });
        }

        return result;
    }

    static async get(id) {
        return await CategoryApi.getCategory(id)
    }

    static async create(data) {
        const result = await CategoryApi.createCategory(data)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });
        // Swal.fire({
        //     text: result.message,
        //     icon: result.status ? "success" : 'warning',
        //     showCancelButton: false,
        //     showConfirmButton: false,
        //     timer:2000,
        // });
        // Toast.dispatch({
        //     type: result.status ? "success" : 'warning',
        //     title: result.message,
        // })

        return result;
    }

    static async update(id, data) {
        const result = await CategoryApi.updateCategory(id, data)

        // Swal.fire({
        //     text: result.message,
        //     icon: result.status ? "success" : 'warning',
        //     showCancelButton: false,
        //     showConfirmButton: false,
        //     timer:2000,
        // });
        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });
        // Toast.dispatch({
        //     type: result.status ? "success" : 'warning',
        //     title: result.message,
        // })

        return result;
    }


    static async delete(id) {
        const alertResult = await Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this category!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!"
        })

        if (!alertResult.isConfirmed) return { status: false }

        const result = await CategoryApi.deleteCategory(id)

        enqueueSnackbar(result.message, { variant : result.status ? "success" : 'warning' });
        // Swal.fire({
        //     text: result.message,
        //     icon: result.status ? "success" : 'warning',
        //     showCancelButton: false,
        //     showConfirmButton: false,
        //     timer:2000,
        // });
        // Toast.dispatch({
        //     type: result.status ? "success" : 'warning',
        //     title: result.message,
        // })

        return result;
    }
}



// // add action to an individual snackbar
// const action = snackbarId => (
//     <>
//       <button onClick={() => { alert(`I belong to snackbar with id ${snackbarId}`); }}>
//         Undo
//       </button>
//       <button onClick={() => { closeSnackbar(snackbarId) }}>
//         Dismiss
//       </button>
//     </>
//   );
  
//   enqueueSnackbar('Your post has been archived', {
//     action,
//   })