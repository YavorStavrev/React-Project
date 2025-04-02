import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/properties';

export const useProperties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setProperties)
    }, []);

    return { properties };
};

export const useProperty = (propertyId) => {
    const [property, setProperty] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${propertyId}`)
            .then(setProperty);
    }, [propertyId])

    return {
        property,
    };
};

export const useCreateProperty = () => {
    const { request } = useAuth();

    const create = (propertyData) =>
        request.post(baseUrl, propertyData);

    return {
        create,
    }
};

export const useEditProperty = () => {
    const { request } = useAuth();

    const edit = (propertyId, propertyData) =>
        request.put(`${baseUrl}/${propertyId}`, { ...propertyData, _id: propertyId });

    return {
        edit,
    }
};

export const useDeleteProperty = () => {
    const { request } = useAuth();

    const deleteProperty = (propertyId) =>
        request.delete(`${baseUrl}/${propertyId}`);

    return {
        deleteProperty,
    }
};
