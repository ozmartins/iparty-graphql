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

    errorMessage(error) {
        return error.response.data || `${error.response.status}-${error.response.statusText}`;
    }

    async getAll() {
        return (await axios.get(this.url(), this.header())).data;
    }

    async get(id) {
        return (await axios.get(`${this.url()}/${id}`, this.header())).data;
    }

    async post(city) {
        try {
            return (await axios.post(this.url(), city, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async put(id, version, city) {
        try {
            return (await axios.put(`${this.url()}/${id}/${version}`, city, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async delete(id) {
        try {
            await axios.delete(`${this.url()}/${id}`, this.header());
            return id;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }
}

module.exports = CityAPI;