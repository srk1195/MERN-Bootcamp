import config from '../../config';

const debug = require('debug')('front:OrderHelper');

export const makeAnOrder = (userId, token, orderData) =>
    fetch(`${config.API}/order/create/${userId}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'POST',
        body: { order: orderData },
    })
        .then((response) => response.json())
        .catch((error) => debug(error));
