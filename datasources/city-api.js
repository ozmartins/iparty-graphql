const { RESTDataSource } = require('apollo-datasource-rest');

class CityAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://localhost:44352/';
    }

    getAll() {
        this.get('city');
    }
}