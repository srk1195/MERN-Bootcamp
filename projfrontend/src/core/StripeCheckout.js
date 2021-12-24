import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import StripeCheckoutButton from 'react-stripe-checkout';
import { isAuthenticated } from '../auth/helper';
import config from '../config';
import { cartEmpty } from './helper/CartHelper';

const debug = require('debug')('front:StripeCheckout');

const StripeCheckout = ({
    products,
    setReload = function (f) {
        return f;
    },
    reload = false,
}) => {
    // Calculating final Amount

    let finalAmount = 0;
    const displayFinalAmount = () => {
        products.map((product) => (finalAmount = product.price + finalAmount));
        return (
            <>
                <p> CheckOut</p>
                {finalAmount === 0 ? (
                    <p> No Products added!</p>
                ) : (
                    <p>
                        Total Payble
                        <span style={{ color: '#1982c4' }}>
                            {config.INR_SIGN} {finalAmount}{' '}
                        </span>
                    </p>
                )}
            </>
        );
    };

    const hanldePayment = (token) => {
        const body = {
            token,
            products,
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        return fetch('http://localhost:8000/stripe/payment', {
            headers,
            method: 'POST',
            body: JSON.stringify(body),
        })
            .then((response) => {
                debug('RESPONSE', response);
                debug(response.status);
                // cartEmpty(() => {
                //     debug('Cart Emptied!!!');
                // });
                // setReload(!reload);
            })
            .catch((err) => debug(err));
    };

    const showStripeButton = () =>
        isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey={config.STRIPE_KEY}
                token={hanldePayment}
                amount={finalAmount * 100}
                currency="inr"
                shippingAddress
                billingAddress
            >
                <button type="button" className=" btn btn-custom-yellow">
                    Stripe
                </button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin" style={{ color: 'red' }}>
                Sign-in
            </Link>
        );

    const testEmptyCart = () => {
        debug('In func of testEmptyCart');
        cartEmpty(() => {
            debug('Cart Emptied!!!');
        });
        setReload(!reload);
    };

    return (
        <>
            <div>
                <div className="mb-4">{displayFinalAmount()}</div>
                <div>{showStripeButton()}</div>
            </div>
            <div className="pt-4">
                <button type="button" className=" btn btn-large btn-danger" onClick={testEmptyCart}>
                    Test Empty Cart
                </button>
            </div>
        </>
    );
};

StripeCheckout.propTypes = {
    products: PropTypes.shape({
        map: PropTypes.func,
    }),
    reload: PropTypes.bool,
    setReload: PropTypes.func,
};

export default StripeCheckout;
