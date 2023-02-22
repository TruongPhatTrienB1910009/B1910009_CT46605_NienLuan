import createApiCliet from './api.service';

class reservationService {
    constructor(baseUrl = '/api/myapp/reservation') {
        this.api = createApiCliet(baseUrl);
    }

    async createReservation(data) {
        return (await this.api.post("/", data)).data;
    }
}

export default new reservationService();