import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createCategory } from './helper/adminapicall';
import { isAuthenticatedAction } from '../redux/actions/authActions';

const debug = require('debug')('front:AddCate');

const AddCategory = () => {
    /* 
  Here I puled user,token using reducer as well as in normal way
  */
    const [name, setName] = useState('');
    // const { user, token } = JSON.parse(isAuthenticated());

    // Reducer Stuff
    const { newAuth } = useSelector((state) => state.auth);
    const { user, token } = newAuth;
    const dispatch = useDispatch();

    useEffect(() => {
        debug('Effect created!');
        dispatch(isAuthenticatedAction());
        return () => {
            debug('cleanup done');
        };
    }, []);

    // Reducer Stuff!

    const goBack = () => (
        <div>
            <Link to="/admin/dashboard" className="btn btn-sm btn-custom-outline-yellow">
                Admin Home
            </Link>
        </div>
    );

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Network Request Fired
        createCategory(user._id, token, { name }) // We are stringifying the user later, so pass as obj
            .then((response) => {
                if (response.error) {
                    debug(response.error);
                }
                toast.success(`${JSON.stringify(name)} category added to collection`);
                setName('');
            })
            .catch((error) => {
                toast.error(`Failed to add the category${JSON.stringify(name)}`);
                debug(error);
                setName('');
            });
    };

    const categoryForm = () => (
        <form>
            <div className="form-group">
                <p className="lead">Enter The Category</p>

                <input
                    type="text"
                    name="name"
                    className="form-control my-3"
                    placeholder="For Ex: Spring"
                    onChange={handleChange}
                    value={name}
                    required
                    minLength={3}
                    maxLength={10}
                />

                <button type="button" className="btn block btn-custom btn-sm" onClick={handleSubmit}>
                    Add to collection
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Category Creation"
            description="Feeling a chance for new Category ? Add it here"
            className="container bg-custom p-4"
        >
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {categoryForm()}
                    {goBack()}
                    {JSON.stringify(user)}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;
