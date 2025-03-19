import { Link } from "react-router";

export default function Header() {
    return (
        <header>
            <nav className="navigation">
                <div className="nav-left">
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                    <Link to="/">Home</Link>
                    <Link to="/catalog">Catalog</Link>
                    <Link to="/properties/create">Create</Link>
                </div>
                <div className="nav-right">
                    <Link to="/logout">Logout</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
}