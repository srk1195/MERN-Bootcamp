import config from '../../config';

const debug = require('debug')('front:AuthIndex');

export const signup = (user) => {
    if (user) {
        return fetch(`${config.API}signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .catch((err) => debug(err));
    }
};

export const signin = (user) => {
    if (user) {
        return fetch(`${config.API}signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .catch((err) => debug(err));
    }
};

// Saving user item to localstorage!
export const authenticate = (data, next) => {
    if (window instanceof Object) {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window === undefined) {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(JSON.stringify(localStorage.getItem('jwt')));
    }
    return false;
};

export const signout = async (next) => {
    if (window instanceof Object) {
        localStorage.removeItem('jwt');

        next();

        // sending api request!
        try {
            const response = await fetch(`${config.API}signout`, {
                method: 'GET',
            });
            debug('User Signed out!');
            return await response.json();
        } catch (err) {
            debug(err);
            return err;
        }
    }
};
