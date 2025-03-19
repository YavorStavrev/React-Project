import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import propertyService from "../../services/propertyService";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-create/CommentsCreate";
import commentService from "../../services/commentService";

export default function Details({
    email,
}) {
    const navigate = useNavigate();
    const [property, setProperty] = useState({});
    const [comments, setComments] = useState([]);
    const { propertyId } = useParams();

    useEffect(() => {
        propertyService.getOne(propertyId)
            .then(setProperty);

        commentService.getAll(propertyId)
            .then(setComments)
    }, [propertyId]);

    const propertyDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${property.neighborhood} property?`);

        if (!hasConfirm) {
            return;
        }

        await propertyService.delete(propertyId);

        navigate('/catalog');
    };

    const commentCreateHandler = (newComment) => {
        setComments(state => [...state, newComment]);
    };

    return (
        <section id="property-details">
            

            <h1>Property Details</h1>
            <div className="info-section">

                <div className="property-header">
                    <div className="header-top">
                        <Link to="/catalog" className="back-button">← Back</Link>
                    </div>
                    <img className="property-img" src={property.imageUrl} />
                    <h1>{property.city}</h1>
                    <span className="neighborhood">Neighborhood: {property.neighborhood}</span>
                    <p className="type">{property.propertyType}</p>
                </div>

                <p className="text">{`Sales or Rentals: ${property.sales}`}</p>
                <p className="text">{`Price: ${property.price}`}</p>
                <p className="text">{`Area: ${property.area}`}</p>

                <CommentsShow comments={comments} />

                
                <div className="buttons">
                    <Link to={`/properties/${propertyId}/edit`} className="button">Edit</Link>
                    <button
                        onClick={propertyDeleteClickHandler}
                        className="button"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <CommentsCreate
                email={email}
                propertyId={propertyId}
                onCreate={commentCreateHandler}
            />
        </section>
    );
}
