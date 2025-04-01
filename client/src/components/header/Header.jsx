import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function Header() {

    const { email, isAuthenticated } = useAuth();
    return (
        <header>
            <nav className="navigation">
                <div className="nav-left">
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                    <Link to="/">Home</Link>
                    <Link to="/catalog">Catalog</Link>
                    {isAuthenticated &&
                        <Link to="/properties/create">Create</Link>
                    }
                </div>
                <div className="nav-right">
                    {isAuthenticated
                        ? (
                            <Link to="/logout">Logout</Link>
                        )
                        : (
                            <>
                                < Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </header >
    );
}