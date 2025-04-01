import { Link } from "react-router";

export default function Home() {
    return (
        <div className="home">
            <h1>Welcome to Our Website</h1>
            <p>Your perfect place for finding amazing properties.</p>
            <Link to="/catalog" className="btn">Explore Now</Link>
        </div>
    );
}
