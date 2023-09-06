import { API_URLS, API_ORIGIN } from "@config";
import { ApiRequest } from "@service";

export default class ShopApi {
    static async getAllShops(options = {}) {
        const { pagination = false, limit = 10, page = 1 } = options;

        let TARGET   = API_URLS.ADMIN.SHOP.GET_ALL;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url
            .replace('[pagination]', pagination)
            .replace('[limit]', limit)
            .replace('[page]', page);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }


    static async createShop(data) {
        let TARGET   = API_URLS.ADMIN.SHOP.CREATE;
    
        const METHOD = TARGET.method;
        const URL    = TARGET.url;

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }


    static async getShop(id) {
        let TARGET   = API_URLS.ADMIN.SHOP.GET_ONE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }

    static async updateShop(id, data) {
        let TARGET   = API_URLS.ADMIN.SHOP.UPDATE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }

    static async deleteShop(id) {
        let TARGET   = API_URLS.ADMIN.SHOP.DELETE;
    
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);
    
        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }
}