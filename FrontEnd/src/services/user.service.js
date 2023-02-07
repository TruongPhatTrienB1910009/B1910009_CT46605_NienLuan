import createApiClient from './api.service';

class userService {
    constructor(baseUrl = '/api/myapp/user') {
        this.api = createApiClient(baseUrl);
    }

    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
}

export default new userService();