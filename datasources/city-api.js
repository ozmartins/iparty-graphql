const { RESTDataSource } = require('apollo-datasource-rest');
const axios = require('axios');

class CityAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:5000/';
    }

    async getAll(token) {
        const result = await axios.get(this.baseURL + 'city', { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    }

    async get(token, id) {
        const result = await axios.get(this.baseURL + `city${id}`, { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    }

    async post(token, city) {
        const result = await axios.post(this.baseURL + 'city', city, { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    }

    async put(token, id, city) {
        const result = await axios.get(this.baseURL + `city${id}`, city, { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    }

    async delete(token, id) {
        const result = await axios.get(this.baseURL + `city${id}`, { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    }
}

module.exports = CityAPI;