import { API_URLS, API_ORIGIN } from "@config";
import { ApiRequest } from "@service";

export default class AuthApi {
    static async login(data) {
        let TARGET   = API_URLS.AUTH.LOGIN;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url;

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data, { authHeader:false })
    }


    static async check() {
        let TARGET   = API_URLS.AUTH.CHECK;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url;

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }

}
