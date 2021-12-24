import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated, signout as signoutAPI } from '../auth/helper';

const currentTab = (history, currentPath) => {
    if (history.location.pathname === currentPath) {
        return { color: '#1982c4' };
    }
    return { color: '#FFFFFF' };
};

const Menu = (props) => {
    const { history } = props;

    const links = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'U Dash',
            path: '/user/dashboard',
        },
        {
            name: 'A Dash',
            path: '/admin/dashboard',
        },
        {
            name: 'Cart',
            path: '/cart',
        },
    ];

    const handleLogout = () => {
        signoutAPI(() => {
            history.push('/signin');
        })
            .then((data) => {
                if (data.error) {
                    toast(data.error);
                }
                toast.dark('Logged out!');
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div>
            <ul className="nav nav-tabs bg-dark nav-text">
                {isAuthenticated() ? (
                    <>
                        {links.map((eachLink) => (
                            <li key={eachLink.name} className="nav-item">
                                <Link
                                    style={currentTab(history, eachLink.path)}
                                    className="nav-link"
                                    to={eachLink.path}
                                >
                                    {eachLink.name}
                                </Link>
                            </li>
                        ))}

                        <li className="nav-link text-warning btn" onClick={handleLogout}>
                            Log me out!
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link style={currentTab(history, '/signin')} className="nav-link" to="/signin">
                                SignIn
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={currentTab(history, '/signup')} className="nav-link" to="/signup">
                                Signup
                            </Link> 
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

Menu.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export default withRouter(Menu);

