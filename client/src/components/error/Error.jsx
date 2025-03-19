import { Link } from "react-router";

export default function Error() {
    return (
        <div id="error-page">
            <div id="error-box">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>Sorry, the page you are looking for doesn’t exist or has been moved.</p>
                <Link to="/" className="back-button-home">Go Back Home</Link>
            </div>
        </div>

    );
}