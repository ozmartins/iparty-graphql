const resolvers = {
    Query: {
        cities: (_, __, { dataSources }) => {
            return dataSources.cityAPI.getAll();
        }
    }
}

module.exports = resolvers;