import { AuthApi } from "@api";
import { SnackbarProvider, enqueueSnackbar } from "notistack"

let token = false;
let permissions = false;
let isLogin = false;

export default class AuthService {
    static async login(data) {
        const result =  await AuthApi.login(data);

        enqueueSnackbar(result.message, { variant : result.status ? 'success' : 'warning' });

        if (result.status) {
            token       = result.data.token;
            permissions = result.data.permissions;
            isLogin     = true;
        }
       
        return result;
    }

    static async check(returnResult = false) {
        if (isLogin) return true;

        const result = await AuthApi.check();

        if(returnResult)   return result

        if (result.status) return true;
        
        return false;
    }
}