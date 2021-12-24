import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '.';

const PrivateRoutes = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (isAuthenticated()) {
                return <Component {...props} />;
            }
            toast.dark('You must be logged in');
            return <Redirect to="/signin" />;
        }}
    />
);

PrivateRoutes.propTypes = {
    component: PropTypes.any,
};

export default PrivateRoutes;
