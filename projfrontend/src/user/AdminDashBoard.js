import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
// const debug = require('debug')('front:AdminDash');

const AdminDashBoard = () => {
    const { user } = JSON.parse(isAuthenticated());

    const { emailId: email, name } = user;

    const adminLeftSide = () => (
        <div className="card">
            <h4 className="card-header bg-dark text-white">Admin Navigation</h4>

            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/admin/create/category" className="nav-link text-custom">
                        Create Categories
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/categories" className="nav-link text-custom">
                        Manage Categories
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/create/product" className="nav-link text-custom">
                        Create Product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products" className="nav-link text-custom">
                        Manage Product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products/reducer" className="nav-link text-custom">
                        Manage Product Reducer
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/orders" className="nav-link text-custom">
                        Manage Orders
                    </Link>
                </li>
            </ul>
        </div>
    );

    const adminRightSide = () => (
        <div className="card mb-4">
            <h4 className="card-header bg-dark text-white">Admin Details</h4>

            <ul className="list-group text-custom">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="badge-badge badge-pill badge-dark">Name</span>
                    {name}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="badge-badge badge-pill badge-dark">Email</span>
                    {email}
                </li>
                <li className="list-group-item  justify-content-between align-items-center">
                    <span className="badge-badge badge-pill badge-warning">Admin</span>
                    Admin
                </li>
            </ul>
        </div>
    );

    return (
        <Base title="Admin Dashboard" description="Manage Tshirts hassle free">
            <div className="container">
                <div className="row">
                    <div className="col-3">{adminLeftSide()}</div>
                    <div className="col-9">{adminRightSide()}</div>
                </div>
            </div>
        </Base>
    );
};

export default AdminDashBoard;
