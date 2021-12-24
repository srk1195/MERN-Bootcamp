import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getACategory, updateTheCategory } from './helper/adminapicall';

const debug = require('debug')('front:UpdateCate');

const UpdateCategory = ({ match }) => {
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { user, token } = JSON.parse(isAuthenticated());
    const { params } = match;

    const preLoadData = (id) => {
        getACategory(id)
            .then((data) => {
                if (data.error) {
                    debug(data.error);
                    toast.error('Error Occured in preLoad');
                }
                setName(data.name);
            })
            .catch((error) => debug(error));
    };

    useEffect(() => {
        debug('Effect created!');
        preLoadData(params.categoryId);
        return () => {
            debug('cleanup done');
        };
    }, [params.categoryId]);

    const goBack = () => (
        <div className="pb-2">
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
        updateTheCategory(user._id, token, params.categoryId, { name }) // We are stringifying the user later, so pass as obj
            .then((response) => {
                debug(response);
                if (response.error) {
                    debug(response.error);
                }
                toast.success(`Updated the Category to: ${JSON.stringify(response.name)}`);
                setName(response.name);

                setTimeout(() => {
                    setRedirect(true);
                }, 2000);
            })
            .catch((error) => {
                toast.error(`Failed to modify category: ${JSON.stringify(name)}`);
                // console.log(error);
                debug(error);
                setName('');
            });
    };

    const categoryForm = () => (
        <form>
            <div className="form-group">
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
                    Change
                </button>
            </div>
        </form>
    );

    return (
        <Base
            title="Category updation"
            description="Change the Category details..."
            className="container bg-custom p-4"
        >
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {redirect ? <Redirect to="/admin/categories/" /> : null}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

UpdateCategory.propTypes = {
    match: PropTypes.object,
    params: PropTypes.object,
    categoryId: PropTypes.number,
};

export default UpdateCategory;
