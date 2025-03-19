import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/property';

export default {
    async getAll() {
        const result = await request.get(baseUrl);

        const properties = Object.values(result);

        return properties;
    },
    getOne(propertyId) {
        return request.get(`${baseUrl}/${propertyId}`);
    },
    create(propertyData) {
        return request.post(baseUrl, propertyData);
    },
    edit(propertyId, propertyData) {
        return request.put(`${baseUrl}/${propertyId}`, { ...propertyData, _id: propertyId });
    },
    delete(propertyId) {
        return request.delete(`${baseUrl}/${propertyId}`);
    },
};
