import { API_URLS, API_ORIGIN } from "@config";
import { ApiRequest } from "@service";

export default class OrderApi {
    static async getAllOrders(options = {}) {
        const { pagination = false, limit = 10, page = 1 } = options;

        let TARGET   = API_URLS.SHOP.ORDER.GET_ALL;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url
            .replace('[pagination]', pagination)
            .replace('[limit]', limit)
            .replace('[page]', page);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }


    static async createOrder(data) {
        let TARGET   = API_URLS.SHOP.ORDER.CREATE;
    
        const METHOD = TARGET.method;
        const URL    = TARGET.url;

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }


    static async getOrder(id) {
        let TARGET   = API_URLS.SHOP.ORDER.GET_ONE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }

    static async updateOrder(id, data) {
        let TARGET   = API_URLS.SHOP.ORDER.UPDATE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }

    static async createOrderTransaction(id, data) {
        let TARGET   = API_URLS.SHOP.ORDER.CREATE_ORDER_TRANSACTION;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }

    static async confirmOrder(id, data) {
        let TARGET   = API_URLS.SHOP.ORDER.CONFIRM_ORDER;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }

    static async deleteOrder(id) {
        let TARGET   = API_URLS.SHOP.ORDER.DELETE;
    
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);
    
        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }
}