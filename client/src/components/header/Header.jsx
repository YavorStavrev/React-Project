export default function Header() {
    return (
        <header>
            <nav className="navigation">
                <div className="nav-left">
                    <img className="logo" src="/images/logo.png" alt="Logo" />
                    <a href="#">Home</a>
                    <a href="#">Catalog</a>
                    <a href="#">Create</a>
                </div>
                <div className="nav-right">
                    <a href="#">Logout</a>
                    <a href="#">Login</a>
                    <a href="#">Register</a>
                </div>
            </nav>
        </header>
    );
}