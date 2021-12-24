import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '.';

const AdminRoutes = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            const { user } = JSON.parse(isAuthenticated());

            if (user && user.roles === 1) {
                return <Component {...props} />;
            }
            toast.dark('Admin Only access!');
            return <Redirect to="/signin" />;
        }}
    />
);

AdminRoutes.propTypes = {
    component: PropTypes.any,
};

export default AdminRoutes;
