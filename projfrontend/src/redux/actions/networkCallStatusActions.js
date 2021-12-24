import * as types from './actionTypes';
import config from '../../config';
const debug = require('debug')('front:authActions');

export const networkRefresh = () => {
  return { type: types.NETWORK_CALL_REFRESH };
};

export const networkError = (error) => {
  return { type: types.NETWORK_CALL_ERROR, payload: error };
};
