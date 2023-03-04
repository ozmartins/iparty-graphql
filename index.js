const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');
const { readFileSync } = require('fs');
const gql = require('graphql-tag');
const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');
const CityAPI = require('./datasources/city-api');
const CustomerAPI = require('./datasources/customer-api');

const startApolloServer = async () => {
    try {
        const server = new ApolloServer({ typeDefs, resolvers });

        const context = ({ req }) => {
            const token = req.headers.authorization;
            return {
                token,
                dataSources: {
                    cityAPI: new CityAPI(token),
                    customerAPI: new CustomerAPI(token)
                }
            }
        }

        const listen = {
            port: 4000
        }

        const options = {
            context,
            listen
        };

        const { url } = await startStandaloneServer(server, options);

        console.log(`server running at ${url}`);
    } catch (error) {
        console.error(error);
    }
};

startApolloServer();