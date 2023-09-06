import { API_URLS, API_ORIGIN } from "@config";
import { ApiRequest } from "@service";

export default class ProductApi {
    static async getAllProducts(options = {}) {
        const { variants = false, category = false, subCategory = false, pagination = false, limit = 10, page = 1 } = options;

        let TARGET = API_URLS.ADMIN.PRODUCT.GET_ALL;
      
        const METHOD = TARGET.method;
        const URL = TARGET.url.replace('[variants]', variants)
            .replace('[category]', category)
            .replace('[subCategory]', subCategory)
            .replace('[pagination]', pagination)
            .replace('[limit]', limit)
            .replace('[page]', page);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }


    static async createProduct(data) {
        let TARGET = API_URLS.ADMIN.PRODUCT.CREATE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url;

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }


    static async getProduct(id) {
        let TARGET   = API_URLS.ADMIN.PRODUCT.GET_ONE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }

    static async updateProduct(id, data) {
        let TARGET   = API_URLS.ADMIN.PRODUCT.UPDATE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }

    static async deleteProduct(id) {
        let TARGET   = API_URLS.ADMIN.PRODUCT.DELETE;
    
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);
    
        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }
}
