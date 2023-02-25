const resolvers = {
    Query: (_, __, { dataSources }) => {
        return dataSources.cityAPI.getAll();
    }
}

module.exports = resolvers;