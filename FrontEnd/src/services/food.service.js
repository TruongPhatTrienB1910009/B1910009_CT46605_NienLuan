import createApiClient from './api.service';

class foodService {
    constructor(baseUrl = '/api/myapp/food') {
        this.api = createApiClient(baseUrl);
    }

    async getAllFood() {
        return (await this.api.get('/')).data;
    }

    async createFood(data) {
        return (await this.api.post('/', data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`));
    }
}

export default new foodService();