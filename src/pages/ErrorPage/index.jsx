import { useRouteError } from 'react-router-dom';

function ErrorPage(){
    const error = useRouteError()
    return(
        <div>Error : {error.status}, Sorry {error.message}</div>
    )
}

export default ErrorPage;