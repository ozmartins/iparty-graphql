const { ApolloServer } = require('@apollo/server');
const resolvers = require('resolvers');
const typeDefs = require('schema');
const CityAPI = require('./datasources/city-api');

const dataSources = {
    cityAPI: new CityAPI()
}

const server = new ApolloServer(typeDefs, resolvers, dataSources);

const { url } = server.listen({ port: 4000 })

console.log(`server running at {url}`)