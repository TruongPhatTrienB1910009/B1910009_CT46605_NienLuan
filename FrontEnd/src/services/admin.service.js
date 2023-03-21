import createAPI from './api.service';

class adminService {
    constructor(BaseURL = '/api/myapp/admin') {
        this.api = createAPI(BaseURL);
    }

    async statisticalRecent() {
        return (await this.api.get('/')).data;
    }
}

export default new adminService();