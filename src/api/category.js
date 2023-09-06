import { API_URLS, API_ORIGIN } from "@config";
import { ApiRequest } from "@service";

export default class CategoryApi {
    static async getAllCategories(options = {}) {
        const { subCategory = false, pagination = false, limit = 10, page = 1 } = options;

        let TARGET   = API_URLS.ADMIN.PRODUCT_CATEGORY.GET_ALL;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url
            .replace('[subCategory]', subCategory)
            .replace('[pagination]', pagination)
            .replace('[limit]', limit)
            .replace('[page]', page);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }


    static async createCategory(data) {
        let TARGET = API_URLS.ADMIN.PRODUCT_CATEGORY.CREATE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url;

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }


    static async updateCategory(id, data) {
        let TARGET   = API_URLS.ADMIN.PRODUCT_CATEGORY.UPDATE;
    
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL, data)
    }


    static async getCategory(id) {
        let TARGET   = API_URLS.ADMIN.PRODUCT_CATEGORY.GET_ONE;
      
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);

        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }

    static async deleteCategory(id) {
        let TARGET   = API_URLS.ADMIN.PRODUCT_CATEGORY.DELETE;
    
        const METHOD = TARGET.method;
        const URL    = TARGET.url.replace('[id]', id);
    
        return await ApiRequest.dispatch(API_ORIGIN, METHOD, URL)
    }
}
