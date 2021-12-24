import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

const debug = require('debug')('front:Home 🏠');

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts().then((data) => {
            if (data.error) {
                setError(data.error);
                debug(error);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    return (
        <Base title="One Stop for Your T-shirts" description="Latest trends & fast Checkout">
            <div>
                <div className="row">
                    {products.map((product, index) => (
                        <div key={index} className="col-3 mb-4">
                            <Card product={product} />
                        </div>
                    ))}
                    <div className="col-3 mb-4">
                        <Card />
                    </div>
                </div>
            </div>
        </Base>
    );
}

export default Home;
