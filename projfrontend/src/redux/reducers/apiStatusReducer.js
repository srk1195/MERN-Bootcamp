import * as types from '../actions/actionTypes';
import initialState from '../initialState';
// const debug = require('debug')('front:apiReducer');

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

const apiStatusReducer = (state = initialState.apiCallsInProgress, action) => {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    //logic
    return state - 1;
  } else if (action.type === types.CLEAN_UP) {
    return initialState.apiCallsInProgress;
  } else {
    return state;
  }
};

export default apiStatusReducer;
