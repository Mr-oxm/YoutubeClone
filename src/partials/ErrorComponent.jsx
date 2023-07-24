import { useRouteError } from "react-router-dom"
function ErrorComponent() {
    const error= useRouteError();
    return (
        <p><p>Oops! Something went wrong! </p>{error.message}</p>
    )
}
export default ErrorComponent