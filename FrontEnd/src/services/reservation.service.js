import createApiClient from './api.service';

class reservationService {
    constructor(baseUrl = '/api/myapp/reservation') {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async createReservation(data) {
        return (await this.api.post("/", data)).data;
    }

    async getReservationByUserID(userID) {
        return (await this.api.get(`/user/${userID}`)).data;
    }

    async getReservationByID(reserID) {
        return (await this.api.get(`/${reserID}`)).data;
    }

    async addorremoveFood(data) {
        return (await this.api.put("/food/", data)).data;
    }
}

export default new reservationService();