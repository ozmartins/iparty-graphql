const resolvers = {
    Query: {
        //city
        cities: (_, __, { dataSources }) => {
            return dataSources.cityAPI.getAll();
        },
        city: (_, { id }, { dataSources }) => {
            return dataSources.cityAPI.get(id);
        },
        //customer
        customers: (_, __, { dataSources }) => {
            return dataSources.customerAPI.getAll();
        },
        customer: (_, { id }, { dataSources }) => {
            return dataSources.customerAPI.get(id);
        },
    },
    Mutation: {
        //city
        createCity: async (_, { input }, { dataSources }) => {
            return await dataSources.cityAPI.post(input);
        },
        updateCity: async (_, { id, version, input }, { dataSources }) => {
            return await dataSources.cityAPI.put(id, version, input);
        },
        deleteCity: async (_, { id }, { dataSources }) => {
            return await dataSources.cityAPI.delete(id);
        },
        //customer
        createCustomer: async (_, { input }, { dataSources }) => {
            return await dataSources.customerAPI.post(input);
        }
    }
}

module.exports = resolvers;