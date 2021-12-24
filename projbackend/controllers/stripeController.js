/* eslint-disable no-return-assign */
// eslint-disable-next-line max-len
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const { v4: uuid } = require('uuid');
const debug = require('debug')('app:StripeController');

const makePayment = (req, res) => {
  const { products, token } = req.body;

  let finalAmount = 0;
  products.map((product) => (finalAmount = product.price + finalAmount));

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      // then-start
      stripe.charges
        .create(
          {
            amount: finalAmount * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: 'A buy you will cherish forever',
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          debug(result);
          return res.status(200).json(result);
        })
        .catch((err) => debug(err));
      // then-end
    });
  // end of fun
};

module.exports = makePayment;
