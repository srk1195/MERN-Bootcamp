import { isAuthenticated, signout as signOutAPI } from '../../auth/helper';
import * as types from './actionTypes';
import { apiCallError, beginApiCall } from '../actions/apiStatusActions';
import config from '../../config';
import axios from 'axios';
const debug = require('debug')('front:authActions');

export const loadAuth = (auth) => {
  const newAuth = { name: 'Rhaul', age: 22 };
  const { user } = JSON.parse(isAuthenticated());

  return { type: types.LOAD_PROFILE, newAuth: user };
};

export const signUpUserActionSuccess = (user) => {
  return { type: types.SIGNUP_USER_SUCCESS, user: user };
};

export const signUpUserFailure = (error) => {
  return { type: types.SIGNUP_USER_FAILURE, error };
};

export const cleanUpState = () => {
  return { type: types.CLEAN_UP };
};

//thunk
export const signUpUser = (user) => {
  return function (dispatch) {
    dispatch(beginApiCall());

    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    return axios
      .post(config.API + 'signup', user, options)
      .then((response) => {
        dispatch(signUpUserActionSuccess(response.data));
        return response.data;
      })
      .catch((err) => {
        dispatch(signUpUserFailure(err.response.data.error));
        dispatch(apiCallError());
        throw err.response.data;
      });
  };
};

export const authenticate = (user, next) => {
  return { type: types.AUTHENTICATE, payload: { user, next } };
};

//not working!
export const isAuthenticatedAction = () => {
  return { type: types.IS_AUTHENTICATED };
};
