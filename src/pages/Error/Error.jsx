import './Error.css';
function ErrorPage() {
    return(
        <>
        <section className='ErrorPage'>
            <h1 className='ERROR404'>404</h1>
            <p className='PageNotFound'>Page Not Found</p>
            <p className='PageNotFoundPara'>We're sorry, the page you requested could not be found Please go back to the home page</p>
        </section>
        </>
    )
}
export default ErrorPage;