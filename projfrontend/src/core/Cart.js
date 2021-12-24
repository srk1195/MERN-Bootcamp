import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { loadCartPage } from './helper/CartHelper';
import StripeCheckout from './StripeCheckout';

// const debug = require('debug')('front:Cart');

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCartPage());
    }, [reload]);

    const loadAllProducts = () => (
        <div>
            <h3>Your Products</h3>
            {products.map((product, index) => (
                <Card
                    product={product}
                    key={index}
                    removeFromCart
                    addToCart={false}
                    setReload={setReload}
                    reload={reload}
                />
            ))}
        </div>
    );
    // const loadCheckOut = () => <div>CheckOut componenet</div>;

    return (
        <Base title="Your Cart" description="Checkout the newly added items">
            {/* <div className="text-white"> {JSON.stringify(localStorage.getItem('cart'))} </div> */}
            <div className="row">
                <div className="col-2">{loadAllProducts()}</div>
                <div className="col-2">
                    <StripeCheckout products={products} setReload={setReload} reload={reload} />
                </div>
            </div>
        </Base>
    );
};
export default Cart;
