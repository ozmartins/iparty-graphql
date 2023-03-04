process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const axios = require('axios');
const BasicAPI = require('./basic-api');

class CustomerAPI extends BasicAPI {
    constructor(token) {
        super(token, 'https://localhost:5001/customer');
    }
}

module.exports = CustomerAPI;