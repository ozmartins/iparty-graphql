const resolvers = {
    Query: {
        cities: (_, __, { dataSources }) => {
            return dataSources.cityAPI.getAll();
        },
        city: (_, { id }, { dataSources }) => {
            return dataSources.cityAPI.get(id);
        }
    },
    Mutation: {
        createCity: async (_, { input }, { dataSources }) => {
            return await dataSources.cityAPI.post(input);
        },
        updateCity: async (_, { id, version, input }, { dataSources }) => {
            return await dataSources.cityAPI.put(id, version, input);
        },
        deleteCity: async (_, { id }, { dataSources }) => {
            return await dataSources.cityAPI.delete(id);
        }
    }
}

module.exports = resolvers;