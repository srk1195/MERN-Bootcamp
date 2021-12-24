import config from '../../config';

const debug = require('debug')('front:CoreAPICalls :airplane:');

export const getProducts = () =>
    fetch(`${config.API}products`, { method: 'GET' })
        .then((response) => response.json())
        .catch((error) => debug(error));
