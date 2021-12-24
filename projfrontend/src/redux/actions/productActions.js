import * as types from './actionTypes';
import { apiCallError, beginApiCall } from '../actions/apiStatusActions';
import config from '../../config';
import axios from 'axios';
import { networkError, networkRefresh } from './networkCallStatusActions';

const debug = require('debug')('front:productActions');

const loadProducts = (products) => {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
};

const deleteProducts = (productId) => {
  return { type: types.DELETE_PRODUCT_SUCCESS, payload: productId };
};

//thunk MW for loading Products

export const loadProductsAction = () => {
  return function (dispatch) {
    // Cleaning up earlier state
    dispatch(beginApiCall());
    dispatch(networkRefresh());

    return axios
      .get(`${config.API}/products`)
      .then((response) => {
        dispatch(loadProducts(response.data));
        dispatch(networkRefresh());

        return response.data;
      })
      .catch((error) => {
        dispatch(apiCallError());
        debug(error.response.data);
        dispatch(
          networkError({
            message: error.response.data,
            status: true,
          })
        );
        debug('error in Axios Catch');
        debug(error.response.data.error);
      });
  };
};

//Thunk MW
export const deleteProductAction = (productId, userId, token) => {
  return function (dispatch) {
    debug(productId, userId, token);
    dispatch(beginApiCall());

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return axios
      .delete(`${config.API}product/${productId}/${userId}`, options)
      .then((response) => {
        dispatch(networkRefresh());
        dispatch(deleteProducts(productId));
        debug(response.data);
      })
      .catch((error) => {
        dispatch(apiCallError());
        dispatch(networkError({ message: error, status: true }));
        debug(error);
        throw error;
      });
  };
};
