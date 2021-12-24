import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct } from './helper/adminapicall';
import { loadProductsAction, deleteProductAction } from '../redux/actions/productActions';
import { isAuthenticatedAction } from '../redux/actions/authActions';

const debug = require('debug')('front:ManageProductsReducer');

function ManageProductsReducer() {
    // Reducer Stuff
    const dispatch = useDispatch();
    const apiCallsInProgress = useSelector((state) => state.apiCallsInProgress);
    const products = useSelector((state) => state.products);
    const { newAuth } = useSelector((state) => state.auth);
    const networkCallStatus = useSelector((state) => state.networkCallStatus);

    const { user, token } = newAuth;
    //   const { user, token } = JSON.parse(isAuthenticated());

    useEffect(() => {
        preLoadData();
        return () => {
            debug('Cleanup Done!');
        };
    }, []);

    const preLoadData = () => {
        dispatch(isAuthenticatedAction());
        dispatch(loadProductsAction());
        if (apiCallsInProgress > 0) {
            toast('Some Error Occured in Listing Products!!');
        }
    };

    const handleDeleteProduct = (productId) => {
        // Reducer action
        dispatch(deleteProductAction(productId, user._id, token));
        /*     deleteProduct(productId, user._id, token)
      .then((data) => {
        debug(data);
        if (data.error) {
          debug(data.error);
        } else {
          preLoadData();
        }
      })
      .catch((err) => debug(err)); */
    };

    const showTable = () => (
        <div className="table-responsive">
            <table className="table table-striped table-dark table-hover">
                <thead className="bg-warning">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sold</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Modify</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <th scope="row">{product._id}</th>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.price}</td>
                            <td>{product.sold}</td>
                            <td>{product.stock}</td>

                            <td>
                                <Link className="btn btn-outline-primary btn-sm" to="/admin/product/update/productId">
                                    <span className="">Update</span>
                                </Link>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDeleteProduct(product._id);
                                    }}
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const debugProds = () => {
        debug(products);

        const { user } = newAuth;
        products.map((prod) => debug(prod._id));
        debug(user.roles);
    };

    return (
        <Base title={`Hey ${newAuth.user.name}`} description="Manage products here">
            <Link className="btn btn-custom btn-sm mb-3" to="/admin/dashboard">
                <span className="">Admin Home</span>
            </Link>
            {networkCallStatus.status ? <h5 className="text-danger">{networkCallStatus.message}</h5> : showTable()}

            {/* {JSON.stringify(networkCallStatus)} */}
        </Base>
    );
}

export default ManageProductsReducer;
