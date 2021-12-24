import React, { useState } from 'react';
import Base from '../core/Base';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { signUpUser, cleanUpState } from '../redux/actions/authActions';

const debug = require('debug')('front:Signup');

const Signup = () => {
    const auth = useSelector((state) => state.auth);
    const apiCallsInProgress = useSelector((state) => state.apiCallsInProgress, shallowEqual);
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: 'Rahul',
        lastname: 'Kodu',
        email: 'rahul.kodu@entr.co',
        password: '12345',
        success: false,
        error: false,
    });

    const { name, email, password, success, lastname, error } = values;

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make thunk call here
        const user = { name, email, password, lastname };
        dispatch(signUpUser(user))
            .then((response) => {
                debug('signed up!');
                toast.info(`🏃 You have Signed Up! Mr.${response.lastname}`);
                setValues({
                    email: '',
                    password: '',
                    name: '',
                    lastname: '',
                    success: true,
                    error: false,
                });
                dispatch(cleanUpState());
            })
            .catch((err) => {
                toast.error(`Failed due to: ${JSON.stringify(err.error)}`);
                setValues({ ...values, success: false, error: true });
                dispatch(cleanUpState());
            });
    };

    const successMessage = () => {
        if (success & (apiCallsInProgress === 0) & (error === false)) {
            return <Redirect to="/signin" />;
        }
    };

    const signUpForm = () => (
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name-field">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name-field"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name-field">Last name</label>
                        <input
                            className="form-control"
                            type="text"
                            id="lastname-field"
                            name="lastname"
                            value={lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email-field">Email</label>
                        <input
                            className="form-control"
                            type="email"
                            id="email-field"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-field">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password-field"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-sm btn-custom btn-block mt-5">
                            Sign-up!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <Base title="Signup Page" description="Exisitng user? Goto Signin">
            {/* {auth.error ? toast(auth.error + 'in here!') : null} */}
            {JSON.stringify(auth)}
            {signUpForm()}
            {successMessage()}
        </Base>
    );
};

export default Signup;
