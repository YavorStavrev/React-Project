import CatalogItem from "./catalog-item/CatalogItem";
import { useProperties } from "../../api/propertyApi";

export default function Catalog() {
    const  { properties } = useProperties();
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