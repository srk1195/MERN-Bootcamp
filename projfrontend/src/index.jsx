import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './styles.css';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

localStorage.debug = 'front:*';

// We are not passing any initial state, as we have default state in reducer() first arg.
// Pass the intialState value, when you are getting data from local storage / servers.
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
