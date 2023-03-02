const resolvers = {
    Query: {
        cities: (_, __, { dataSources }) => {
            return dataSources.cityAPI.getAll();
        },
        city: (_, { id }, { dataSources }) => {
            return dataSources.cityAPI.get(id);
        }
    }
}

module.exports = resolvers;