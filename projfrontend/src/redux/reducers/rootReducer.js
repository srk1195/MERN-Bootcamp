import { combineReducers } from 'redux';
import auth from './authReducer';
import category from './categoryReducer';
import apiStatusReducer from './apiStatusReducer';
import productReducer from './productReducer';
import networkCallStatusReducer from './networkCallStatusReducer';

const rootReducer = combineReducers({
  auth: auth,
  category: category,
  apiCallsInProgress: apiStatusReducer,
  products: productReducer,
  networkCallStatus: networkCallStatusReducer,
});

export default rootReducer;
