import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getAllCategories, removeCategory } from './helper/adminapicall';

const debug = require('debug')('front:ManageCates');

const ManageCategories = () => {
    const { user, token } = JSON.parse(isAuthenticated());
    const [categories, setCategories] = useState([]);

    const preLoadData = () => {
        getAllCategories()
            .then((data) => {
                if (data.error) {
                    debug(data.error);
                }

                setCategories(data);
            })
            .catch((error) => debug(error));
    };

    useEffect(() => {
        preLoadData();
        return () => {
            debug('Clean Up Done!');
        };
    }, []);

    const handleDeleteCategory = (categoryId) => {
        removeCategory(user._id, token, categoryId)
            .then((data) => {
                if (data.error) {
                    debug(data.error);
                }
                // reload the page
                preLoadData();
            })
            .catch((error) => debug(error));
    };

    const showTable = () => (
        <div className="table-responsive">
            <table className="table table-striped table-dark table-hover">
                <thead className="bg-warning">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Modify</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <th scope="row">{category._id}</th>
                            <td>{category.name}</td>
                            <td>
                                <Link
                                    className="btn btn-custom-outline btn-sm"
                                    to={`/admin/category/update/${category._id}`}
                                >
                                    <span className="">Update</span>
                                </Link>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDeleteCategory(category._id);
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
        <Base description="Manage all cates" title="Catees!">
            <Link className="btn btn-custom btn-sm mb-3" to="/admin/dashboard">
                <span className="">Admin Home</span>
            </Link>
            {showTable()}
        </Base>
    );
};

export default ManageCategories;
