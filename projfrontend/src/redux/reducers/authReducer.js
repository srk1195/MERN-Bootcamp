import * as types from '../actions/actionTypes';
import initialState from '../initialState';
const debug = require('debug')('front:authReducer');
// import produce from 'immer';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.LOAD_PROFILE:
      if (!action.newAuth) {
        action.newAuth = state;
      }
      return action.newAuth;

    case types.SIGNUP_USER_SUCCESS:
      if (!action.user) {
        action.user = state;
      }
      return { ...action.user };
    case types.SIGNUP_USER_FAILURE:
      return { ...state, error: action.error };

    case types.AUTHENTICATE:
      const { payload } = action;
      if (window instanceof Object) {
        localStorage.setItem('jwt', JSON.stringify(payload.user));
        payload.next();
      }
      return state;
    case types.IS_AUTHENTICATED:
      if (typeof window === undefined) {
        return { ...state, authenticated: false };
      }

      if (localStorage.getItem('jwt')) {
        /* debug(
          JSON.parse(localStorage.getItem('jwt')),
          typeof localStorage.getItem('jwt')
        ); */

        const newAuth = JSON.parse(localStorage.getItem('jwt'));
        return { ...state, newAuth };
      } else {
        return { ...state, authenticated: false };
      }

    case types.CLEAN_UP:
      return initialState.auth;
    default:
      return state;
  }
};

export default authReducer;
