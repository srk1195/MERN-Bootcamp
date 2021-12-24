/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signin as signinAPI, isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { authenticate as authenticateAction } from '../redux/actions/authActions';

const SignIn = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
        password: '',
        isLoading: false,
        didRedirect: false,
    });

    const { email, password, isLoading, didRedirect } = values;

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // only-place where we set isLoading to true!
        setValues({ ...values, isLoading: true });

        // API Call!
        signinAPI({ email, password })
            .then((data) => {
                if (data.error) {
                    toast(data.error);
                    setValues({ ...values, email: '', password: '' });
                } else {
                    toast.dark('Logging You in!');
                    // saving entire user in the local storage & setting redirect:true
                    dispatch(
                        authenticateAction(data, () => {
                            setValues({
                                ...values,
                                email: '',
                                password: '',
                                error: '',
                                success: true,
                                didRedirect: true,
                            });
                        })
                    );
                }
            })
            .catch((err) => {
                toast.error(err);
            });
    };

    const loadingComp = () => <div>Loading.....!</div>;

    const performRedirect = () => {
        if (didRedirect) {
            // retrieving from localstorage!

            const { user } = JSON.parse(isAuthenticated());

            if (user && user.roles === 1) {
                return <Redirect to="/admin/dashboard" />;
            }
            toast.dark('Welcome!');
            return <Redirect to="/" />;
        }
    };

    const signInForm = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email-field">Email </label>
                        <input
                            className="form-control"
                            type="email"
                            id="email-field"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-field">Password </label>
                        <input
                            className="form-control"
                            type="password"
                            id="password-field"
                            name="password"
                            onChange={handleChange}
                            value={password}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-sm btn-block btn-custom mt-5">
                            Sign-In!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <Base title="Sign In Page" description="New User? Go to Signup!">
            {isLoading ? loadingComp() : signInForm()}
            {performRedirect()}
        </Base>
    );
};

export default SignIn;
