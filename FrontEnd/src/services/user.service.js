import createApiClient from './api.service';

class userService {
    constructor(baseUrl = '/api/myapp/user') {
        this.api = createApiClient(baseUrl);
    }

    async signIn(data) {
        console.log(data);
        return (await this.api.post("/signin", data)).data;
    }

    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

    async logOut() {
        return (await this.api.post("/logout")).data;
    }

    async getUser(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}

export default new userService();