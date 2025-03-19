import { useNavigate } from "react-router";
import propertyService from "../../services/propertyService";

export default function CreatePost() {
    const navigate = useNavigate();

    const submitAction = async (formData) => {
        console.log(formData);
        const propertyData = Object.fromEntries(formData);

        await propertyService.create(propertyData);
        
        
        navigate('/');
    }
    return (
        <section id="create-page" className="auth">
            <form id="create" action={submitAction}>
                <div className="container">

                    <h1>Create Property</h1>
                    <label htmlFor="sales">Sales or Rentals:</label>
                    <input type="text" id="sales" name="sales" placeholder="Enter Sales or Rentals..." />

                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" placeholder="Enter city..." />

                    <label htmlFor="neighborhood">Neighborhood:</label>
                    <input type="text" id="neighborhood" name="neighborhood" placeholder="Enter neighborhood..." />

                    <label htmlFor="property-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="propertyType">Property type:</label>
                    <input type="text" id="propertyType" name="propertyType" placeholder="Enter property type..." />

                    <label htmlFor="price">Property price:</label>
                    <input type="text" id="price" name="price" placeholder="Enter price..." />

                    <label htmlFor="area">Property area:</label>
                    <input type="text" id="area" name="area" placeholder="Enter area..." />

                    <input className="btn submit" type="submit" value="Create Property" />
                </div>
            </form>
        </section>
    );
}