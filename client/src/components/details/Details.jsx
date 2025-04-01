import { Link, useNavigate, useParams } from "react-router";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-create/CommentsCreate";
import { useDeleteProperty, useProperty } from "../../api/propertyApi";
import useAuth from "../../hooks/useAuth";
import { useComments, useCreateComment } from "../../api/commentApi";
import { useOptimistic } from "react";
import { v4 as uuid } from 'uuid';

export default function Details() {
    const navigate = useNavigate();
    const { email, userId } = useAuth()
    const { propertyId } = useParams();
    const { property } = useProperty(propertyId);
    const { deleteProperty } = useDeleteProperty();
    const { create } = useCreateComment();
    const { comments, addComment } = useComments(propertyId);
    const [optimisticComments, setOptimisticComments] = useOptimistic(comments, (state, newComment) => [...state, newComment]);

    const propertyDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete ${property.city} property?`);

        if (!hasConfirm) {
            return;
        }

        await deleteProperty(propertyId);

        navigate('/catalog');
    };

    const commentCreateHandler = async (formData) => {
        const comment = formData.get('comment');

        
        const newOptimisticComment = {
            _id: uuid(),
            _ownerId: userId,
            propertyId,
            comment,
            pending: true,
            author: {
                email,
            }
        };

      
        setOptimisticComments(newOptimisticComment);

       
        const commentResult = await create(propertyId, comment);

        
        addComment({ ...commentResult, author: { email } })
    };

    const isOwner = userId === property._ownerId;

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

                <CommentsShow comments={optimisticComments} />

                {isOwner &&
                    <div className="buttons">
                        <Link to={`/properties/${propertyId}/edit`} className="button">Edit</Link>
                        <button
                            onClick={propertyDeleteClickHandler}
                            className="button"
                        >
                            Delete
                        </button>
                    </div>}
                    
                {!isOwner && email &&
                <>
                
                <CommentsCreate
                    email={email}
                    propertyId={propertyId}
                    onCreate={commentCreateHandler}
                />
                </>
                }
            </div>


        </section>
    );
}
