process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const axios = require('axios');
const BasicAPI = require('./basic-api');

class CustomerAPI extends BasicAPI {
    constructor(token) {
        super(token, 'https://localhost:5001/customer');
    }

    async getPhones(customerId) {
        try {
            return (await axios.get(`${this.url}/${customerId}/phone`, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async postPhone(customerId, phone) {
        try {
            return (await axios.post(`${this.url}/${customerId}/phone`, phone, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async putPhone(customerId, phoneId, phone) {
        try {
            return (await axios.put(`${this.url}/${customerId}/phone/${phoneId}`, phone, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async getAddresses(customerId) {
        try {
            return (await axios.get(`${this.url}/${customerId}/address`, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async postAddress(customerId, address) {
        try {
            return (await axios.post(`${this.url}/${customerId}/address`, address, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }

    async putAddress(customerId, addressId, address) {
        try {
            return (await axios.put(`${this.url}/${customerId}/address/${addressId}`, address, this.header())).data;
        } catch (error) {
            throw new Error(this.errorMessage(error));
        }
    }
}

module.exports = CustomerAPI;