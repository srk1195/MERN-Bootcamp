import * as types from '../actions/actionTypes';
import initialState from '../initialState';

const debug = require('debug')('front:productReducer');

const productReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case types.LOAD_PRODUCTS_SUCCESS:
            return action.products;

        case types.DELETE_PRODUCT_SUCCESS:
            const id = action.payload;

            return state.map((product) => product._id !== id);

        default:
            return state;
    }
};

export default productReducer;
