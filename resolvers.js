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
        }
    },
    Mutation: {
        //city
        createCity: async (_, { input }, { dataSources }) => {
            return await dataSources.cityAPI.post(input);
        },
        updateCity: async (_, { input }, { dataSources }) => {
            return await dataSources.cityAPI.put(input.id, input.version, input);
        },
        deleteCity: async (_, { id }, { dataSources }) => {
            return await dataSources.cityAPI.delete(id);
        },

        //customer
        createCustomer: async (_, { input }, { dataSources }) => {
            const customer = await dataSources.customerAPI.post(input);
            if (input.addresses) {
                input.addresses.forEach(async address => {
                    customer.addresses.push(await dataSources.customerAPI.postAddress(address));
                });
            }
            if (input.phones) {
                input.phones.forEach(async phone => {
                    customer.addresses.push(await dataSources.customerAPI.postPhone(phone));
                });
            }
            return customer;
        },
        deleteCustomer: async (_, { id }, { dataSources }) => {
            return await dataSources.customerAPI.delete(id);
        },
    },
    Customer: {
        phones: async (customer, _, { dataSources }) => {
            return dataSources.customerAPI.getPhones(customer.id);
        },
        addresses: async (customer, _, { dataSources }) => {
            return dataSources.customerAPI.getAddresses(customer.id);
        }
    },
    Address: {
        city: async (address, _, { dataSources }) => {
            return dataSources.cityAPI.get(address.cityId)
        }
    }
}

module.exports = resolvers;