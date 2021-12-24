import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getAllProducts } from './helper/adminapicall';

const debug = require('debug')('front:ManageProducts');

function ManageProducts() {
        const [products, setProducts] = useState([]);

        const { user, token } = JSON.parse(isAuthenticated());

        useEffect(() => {
                preLoadData();
                return () => {
                        debug('Cleanup Done!');
                };
        }, []);

        const preLoadData = () => {
                getAllProducts()
                        .then((data) => {
                                debug(data);
                                if (data.error) {
                                        debug(data.error);
                                } else {
                                        setProducts(data);
                                }
                        })
                        .catch((err) => debug(err));
        };

        const handleDeleteProduct = (productId) => {
                deleteProduct(productId, user._id, token)
                        .then((data) => {
                                debug(data);
                                if (data.error) {
                                        debug(data.error);
                                } else {
                                        preLoadData();
                                }
                        })
                        .catch((err) => debug(err));
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
                                                        <td className={product.sold <= 0 ? 'text-danger' : ''}>
                                                                {product.sold}
                                                        </td>
                                                        <td>{product.stock}</td>
                                                        <td>
                                                                <Link
                                                                        className="btn btn-outline-primary btn-sm"
                                                                        to={`/admin/product/update/${product._id}`}
                                                                >
                                                                        <span className="">Update</span>
                                                                </Link>
                                                        </td>
                                                        <td>
                                                                <button
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

        return (
                <Base title={`Hey ${user.name}`} description="Manage products here">
                        <Link className="btn btn-custom btn-sm mb-3" to="/admin/dashboard">
                                <span className="">Admin Home</span>
                        </Link>
                        {showTable()}
                </Base>
        );
}

export default ManageProducts;
