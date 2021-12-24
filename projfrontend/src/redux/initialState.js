const initialState = {
    auth: {
        newAuth: {
            user: {},
        },
    },
    category: [],
    apiCallsInProgress: 0,
    products: [
        {
            name: '',
            price: '',
            sold: '',
            category: '',
        },
    ],
    networkCallStatus: {
        message: '',
        status: '',
    },
};

export default initialState;
