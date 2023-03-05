process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const axios = require('axios');

class BasicAPI {
    constructor(token, url) {
        this.token = token;
        this.url = url;
    }

    header() {
        return { headers: { 'Authorization': this.token } }
    }

    errorMessage(error) {
        return error.response.data || `${error.response.status}-${error.response.statusText}`;
    }

    async getAll() {
        try {
            return (await axios.get(this.url, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async get(id) {
        try {
            return (await axios.get(`${this.url}/${id}`, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async post(entity) {
        try {
            return (await axios.post(this.url, entity, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async put(id, version, entity) {
        try {
            return (await axios.put(`${this.url}/${id}/${version}`, entity, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async delete(id) {
        try {
            await axios.delete(`${this.url}/${id}`, this.header());
            return id;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }
}

module.exports = BasicAPI;