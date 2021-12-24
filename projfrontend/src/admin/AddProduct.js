import React, { useState, useEffect } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createProduct, getAllCategories } from './helper/adminapicall';

const debug = require('debug')('front:AddProduct');

const AddProduct = () => {
    let timer = null;
    const { user, token } = JSON.parse(isAuthenticated());

    const [values, setValues] = useState({
        name: '',
        price: '',
        description: 'A sample Desc',
        stock: '',
        categories: [],
        category: '',
        loading: false,
        error: '',
        getRedirect: false,
        formData: '',
        createdProduct: '',
        product: '',
        photo: '',
    });

    const {
        name,
        price,
        description,
        stock,
        loading,
        error,
        formData,
        photo,
        product,
        createdProduct,
        getRedirect,
        categories,
        category,
    } = values;

    useEffect(() => {
        preLoad();
        return () => {
            clearTimeout(timer);
            debug('Cleaned Up !');
        };
    }, [timer]);

    const preLoad = () => {
        getAllCategories()
            .then((data) => {
                if (data.error) {
                    // toast.error('Failed to get Categories');
                    setValues({ ...values, error: data.error });
                } else {
                    // toast.success('Loading the cates');
                    setValues({ ...values, categories: data, formData: new FormData() });
                }
            })
            .catch((error) => debug(error));
    };

    const handleChange = (event) => {
        const { value, name } = event.target;

        if (name === 'photo') {
            debug(event.target);
            formData.set(name, event.target.files[0]);
        } else {
            setValues({ ...values, [name]: value });
            formData.set(name, value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData)
            .then((data) => {
                if (data.error) {
                    debug(data.error);
                    toast.error('Failed To create A product');
                    setValues({ ...values, error: data.error });
                } else {
                    toast.success(`${data.name}is now Live!`);

                    timer = setTimeout(() => {
                        setValues({
                            ...values,
                            name: '',
                            description: '',
                            price: '',
                            photo: '',
                            stock: '',
                            category: '',
                            loading: false,
                            getRedirect: true,
                            createdProduct: data.name,
                        });
                    }, 2000);
                }
            })
            .catch((error) => debug(error));
    };

    const performRedirect = () => {
        if (getRedirect && error.length === 0) {
            return <Redirect to="/admin/dashboard" />;
        }
    };

    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: createdProduct ? '' : 'none' }}>
            <h4>{createdProduct} has been created</h4>
        </div>
    );

    const createProductForm = () => (
        <form>
            <span>Post photo</span>
            <div className="form-group">
                <label className="btn btn-block btn-custom">
                    <input
                        onChange={handleChange}
                        type="file"
                        name="photo"
                        accept="image"
                        required
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange}
                    name="name"
                    value={name}
                    required
                    className="form-control"
                    placeholder="Name"
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange}
                    name="description"
                    value={description}
                    className="form-control"
                    placeholder="Description"
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange}
                    name="price"
                    value={price}
                    type="number"
                    className="form-control"
                    placeholder="Price of the product"
                />
            </div>
            <div className="form-group">
                <select onChange={handleChange} name="category" className="form-control" placeholder="Category">
                    <option>Select</option>
                    {categories &&
                        categories.map((cate) => (
                            <option key={cate._id} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange}
                    name="stock"
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button type="submit" onClick={handleSubmit} className="btn btn-custom mb-3">
                Create Product
            </button>
        </form>
    );

    return (
        <Base description="Got a new product? Add here" title="Add Product" className="container bg-custom p-4">
            <Link to="/admin/dashboard" className="btn btn-sm btn-dark mb-3">
                Admin Home
            </Link>

            {/* Actual Form */}

            <div className="row bg-dark rounded text-white">
                <div className="col-md-8 offset-md-2">
                    {/* {successMessage()} */}
                    {createProductForm()}
                    {performRedirect()}
                </div>
            </div>
        </Base>
    );
};

export default AddProduct;
