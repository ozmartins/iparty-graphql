process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const axios = require('axios');

class CityAPI {
    constructor(token) {
        this.token = token;
    }

    url() {
        return 'https://localhost:5001/city';
    }

    header() {
        return { headers: { 'Authorization': this.token } }
    }

    async getAll() {
        console.log(this.url());
        return (await axios.get(this.url(), this.header())).data;
    }

    async get(id) {
        return (await axios.get(`${this.url()}/${id}`, this.header())).data;
    }

    async post(city) {
        await axios.post(this.url(), city, this.header());
    }

    async put(id, city) {
        await axios.put(`${this.url()}/${id}`, city, this.header());
    }

    async delete(id) {
        await axios.delete(`${this.url()}/${id}`, this.header());
    }
}

module.exports = CityAPI;