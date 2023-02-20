import createApiClient from './api.service';

class tableService {
    constructor(baseUrl = '/api/myapp/table') {
        this.api = createApiClient(baseUrl);
    }

    async getAllTables() {
        return (await this.api.get("/")).data;
    }

    async getTableById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}

export default new tableService();