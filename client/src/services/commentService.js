import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export default {
    async getAll(propertyId) {
        const comments = await request.get(baseUrl);

        const propertyComments = Object.values(comments).filter(comment => comment.propertyId === propertyId);

        return propertyComments;
    },
    create(email, propertyId, comment) {
        return request.post(baseUrl, { email, propertyId, comment });
    }
};
