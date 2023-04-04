import createApiClient from './api.service';

class foodService {
    constructor(baseUrl = '/api/myapp/food') {
        this.api = createApiClient(baseUrl);
    }

    async getAllFood() {
        return (await this.api.get('/')).data;
    }

    async createFood(data) {
        console.log(data);
        return (await this.api.post('/', data, { headers: { "Content-Type": "multipart/form-data" } })).data;
    }
}

export default new foodService();