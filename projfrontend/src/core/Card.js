import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import config from '../config';
import { addItemToCart, removeItemFromCartByID } from './helper/CartHelper';
import ImageCard from './helper/ImageCard';

const Card = ({
    product,
    addToCart = true,
    removeFromCart = false,
    setReload = function (f) {
        return f;
    },
    reload = false,
}) => {
    const [redirect, setRedirect] = useState(false);

    const handleAddToCart = () => {
        toast.success(`Added ${product.name} to Cart`);
        addItemToCart(product, () => setRedirect(true));
    };

    const handleRemoveFromCart = () => {
        toast.success(`Removed ${product.name} from cart`);
        removeItemFromCartByID(product._id);
        setReload(!reload);
    };

    const cartTitle = product ? product.name : 'A Dummy Name';
    const productID = product ? product._id : '';
    const description = product ? product.description : 'This is Sample Desc';
    const price = product ? product.price : '0';

    return (
        <div>
            <div className="card text-white bg-dark border-custom ">
                {redirect ? <Redirect to="/cart" /> : null}
                <div className="card-header lead">
                    <em> {cartTitle}</em>
                </div>
                <div className="card-body">
                    <div className="rounded  border-custom p-2">
                        <ImageCard productID={productID} />
                    </div>
                    <p className="lead bg-custom font-weight-normal text-wrap mt-3">{description}</p>
                    <p className="btn btn-success rounded  btn-custom px-4">
                        {config.INR_SIGN}
                        {price}
                    </p>
                    <div className="row">
                        <div className="col-12">
                            {addToCart ? (
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="btn btn-block btn-custom-outline mt-2 mb-2"
                                >
                                    Add to Cart
                                </button>
                            ) : null}
                        </div>
                        <div className="col-12">
                            {removeFromCart ? (
                                <button
                                    type="button"
                                    onClick={handleRemoveFromCart}
                                    className="btn btn-block btn-custom-danger-outline mt-2 mb-2"
                                >
                                    Remove from cart
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    addToCart: PropTypes.bool,
    product: PropTypes.shape({
        _id: PropTypes.any,
        description: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.any,
    }),
    reload: PropTypes.bool,
    removeFromCart: PropTypes.bool,
    setReload: PropTypes.func,
};

export default Card;
