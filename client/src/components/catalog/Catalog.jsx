import { useEffect, useState } from "react";
import propertyService from "../../services/propertyService";
import CatalogItem from "./catalog-item/CatalogItem";
import { Link } from "react-router";

export default function Catalog() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        propertyService.getAll()
            .then(setProperties)
    }, []);
    return (
        <section id="catalog-page">
            <h1>All Properties</h1>
            
            {properties.length > 0
                ? properties.map(property => <CatalogItem key={property._id} {...property} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    );
}