import { API_URLS } from "../config";

class DashboardApi {
    static async getAllStats({ limit = 10, offset = 0 } = {}){
        let URL  = API_URLS.DASHBOARD;
        URL      = URL.replace('[limit]', limit).replace('[offset]', offset);
    
        console.log(URL)
        // return this.axios.get(URL, {baseURL: ''});
    }
}

export default DashboardApi;