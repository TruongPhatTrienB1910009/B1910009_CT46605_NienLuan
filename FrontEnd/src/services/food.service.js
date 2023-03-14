import createApiClient from './api.service';

class foodService {
    constructor(baseUrl = '/api/myapp/food') {
        this.api = createApiClient(baseUrl);
    }

    async getAllFood() {
        return (await this.api.get('/')).data;
    }
}

export default new foodService();