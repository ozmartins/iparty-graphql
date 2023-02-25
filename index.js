const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const gql = require('graphql-tag');
const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');

const CityAPI = require('./datasources/city-api');

const dataSources = { cityAPI: new CityAPI() }

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

startStandaloneServer(server, {
    context: async () => {
        return {
            dataSources
        }
    },
    listen: {
        port: 4000
    }
});

console.log('server running at http://localhost:4000');