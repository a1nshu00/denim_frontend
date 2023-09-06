// import { AuthServiceProvider } from "../../provider/auth";


export default class ApiRequest {
    static async dispatch(origin, method, url, data = {}) {
        // const { Auth } = AuthServiceProvider;

        // console.log('Auth from Auth', Auth)
            // const [accessToken, setAccessToken] = useAccessToken('');
        const token = localStorage.getItem('token')

        const METHOD = method.toUpperCase()
        const options = {
            method:METHOD,
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        }

        if (!['GET', "HEAD"].includes(METHOD)) {
            options['body'] = JSON.stringify(data);
        }
        
        const response = await fetch(origin + url, options);
        return response.json(); // parses JSON response into native JavaScript objects
    }
}