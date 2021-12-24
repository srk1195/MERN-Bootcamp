const express = require('express');

const stripeRouter = express.Router();
const makePayment = require('../controllers/stripeController');

stripeRouter.post('/payment', makePayment);

module.exports = stripeRouter;
