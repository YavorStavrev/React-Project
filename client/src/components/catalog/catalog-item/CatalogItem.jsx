import { Link } from "react-router";

export default function CatalogItem({
    _id,
    imageUrl,
    price,
    area,
    city,
    neighborhood,
    propertyType,
}) {
    return (
      
        <div className="allProperties">
            <div className="allProperties-info">

                <div className="image">
                    <img src={imageUrl} />
                </div>

                <div className="table">
                    <table>

                        <td>
                            <table>
                                <tr>
                                    <td>
                                        <h3>{`€ ${price}`}</h3>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h3>{`${city} | ${neighborhood}`}</h3>
                                      
                                    </td>
                                </tr>
                            </table>
                        </td>

                        <td>
                            <table>
                                <tr>
                                    <td >
                                        <h3>{propertyType}</h3>
                                      
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                        <h3>{area}</h3>
                                      
                                    </td>
                                </tr>
                            </table>
                        </td>

                    </table>
                </div>

                
                <Link to={`/properties/${_id}/details`} className="details-button">Details</Link>
            </div>
        </div>
      
    );
}