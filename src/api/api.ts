import api from './axios';

export class Api {

    static async getUser(id: number) {
        return await api.get(`/users/${id}`);
    }
}