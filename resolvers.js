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
            console.log(input);
            const customer = await dataSources.customerAPI.post(input);
            if (input.addresses) {
                input.addresses.forEach(async address => {
                    const postedAddress = await dataSources.customerAPI.postAddress(customer.id, address)
                    customer.addresses = [];
                    customer.addresses.push(postedAddress);
                });
            }
            if (input.phones) {
                input.phones.forEach(async phone => {
                    const postedPhone = await dataSources.customerAPI.postPhone(customer.id, phone);
                    customer.phones = [];
                    customer.phones.push(postedPhone);
                });
            }
            return customer;
        },
        updateCustomer: async (_, { input }, { dataSources }) => {
            const customer = await dataSources.customerAPI.put(input.id, input.version, input);
            customer.addresses = await dataSources.customerAPI.getAddresses(input.id);
            customer.phones = await dataSources.customerAPI.getPhones(input.id);
            return customer;
        },
        deleteCustomer: async (_, { id }, { dataSources }) => {
            return await dataSources.customerAPI.delete(id);
        },

        //customer - address
        createCustomerAddress: async (_, { customerId, input }, { dataSources }) => {
            await dataSources.customerAPI.postAddress(customerId, input);
            const customer = dataSources.customerAPI.get(customerId);
            customer.addresses = await dataSources.customerAPI.getAddresses(input.id);
            customer.phones = await dataSources.customerAPI.getPhones(input.id);
            return customer;
        },
        updateCustomerAddress: async (_, { customerId, addressId, input }, { dataSources }) => {
            await dataSources.customerAPI.putAddress(customerId, addressId, input);
            const customer = dataSources.customerAPI.get(customerId);
            customer.addresses = await dataSources.customerAPI.getAddresses(input.id);
            customer.phones = await dataSources.customerAPI.getPhones(input.id);
            return customer;
        },
        deleteCustomerAddress: async (_, { customerId, addressId }, { dataSources }) => {
            return await dataSources.customerAPI.deleteAddress(customerId, addressId);
        }
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