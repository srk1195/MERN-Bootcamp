import * as types from '../actions/actionTypes';
import initialState from '../initialState';
const debug = require('debug')('front:networkReducer');

const networkCallStatusReducer = (
  state = initialState.networkCallStatus,
  action
) => {
  switch (action.type) {
    case types.NETWORK_CALL_REFRESH:
      return initialState.networkCallStatus;

    case types.NETWORK_CALL_ERROR:
      return Object.assign({}, { status: true }, action.payload);
    default:
      return state;
  }
};

export default networkCallStatusReducer;
