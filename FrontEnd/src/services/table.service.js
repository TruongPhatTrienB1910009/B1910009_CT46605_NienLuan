import createApiClient from './api.service';

class tableService {
    constructor(baseUrl = '/api/myapp/table') {
        this.api = createApiClient(baseUrl);
    }

    async getAllTables() {
        return (await this.api.get("/")).data;
    }

    async createTable(data) {
        return (await this.api.post("/", data));
    }

    async getTableById(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async deleteTable(id) {
        return (await this.api.delete(`/${id}`));
    }

    async updateTable(id, data) {
        return (await this.api.put(`/${id}`, data));
    }
}

export default new tableService();