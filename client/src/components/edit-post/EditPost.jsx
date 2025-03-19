import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import propertyService from "../../services/propertyService";

export default function EditPost() {
    const navigate = useNavigate();
    const { propertyId } = useParams();
    const [property, setProperty] = useState({});

    useEffect(() => {
        propertyService.getOne(propertyId)
            .then(setProperty);
    }, [propertyId]);

    const formAction = async (formData) => {
        const propertyData = Object.fromEntries(formData);

        await propertyService.edit(propertyId, propertyData);

        navigate(`/properties/${propertyId}/details`);
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" action={formAction}>
                <div className="container">

                    <h1>Edit Property</h1>
                    <label htmlFor="sales">Sales or Rentals:</label>
                    <input type="text" id="sales" name="sales" defaultValue={property.sales} placeholder="Enter Sales or Rentals..." />

                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" defaultValue={property.city} placeholder="Enter city..." />

                    <label htmlFor="neighborhood">Neighborhood:</label>
                    <input type="text" id="neighborhood" name="neighborhood" defaultValue={property.neighborhood} placeholder="Enter neighborhood..." />

                    <label htmlFor="property-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={property.imageUrl} placeholder="Upload a photo..." />

                    <label htmlFor="propertyType">Property type:</label>
                    <input type="text" id="propertyType" name="propertyType" defaultValue={property.propertyType} placeholder="Enter property type..." />

                    <label htmlFor="price">Property price:</label>
                    <input type="text" id="price" name="price" defaultValue={property.price} placeholder="Enter price..." />

                    <label htmlFor="area">Property area:</label>
                    <input type="text" id="area" name="area" defaultValue={property.area} placeholder="Enter area..." />

                    <input className="btn submit" type="submit" defaultValue="Edit Property" />
                </div>
            </form>
        </section>
    );
}