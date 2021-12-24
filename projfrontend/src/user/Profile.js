import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuth } from '../redux/actions/authActions';

const Profile = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(loadAuth());
    };

    return (
        <div
            className="text-white
  "
        >
            Welcome to Profile Page
            <h3>Click the button to change the object</h3>
            <button type="button" className="btn btn-custom" onClick={handleClick}>
                Clickme
            </button>
            <p>{JSON.stringify(auth)}</p>
        </div>
    );
};

export default Profile;
