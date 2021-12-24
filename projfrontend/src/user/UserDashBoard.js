import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const getAllUsers = async () => {
    const { data } = await axios.get(`${config.API}/users`);
    return await data;
};

const UserDashBoard = () => {
    const [userData, setUserData] = useState();

    useEffect(() => {
        getAllUsers()
            .then((res) => setUserData(res[0]))
            .catch((err) => console.log(err));
    }, []);

    return <div className="container text-white">{JSON.stringify(userData, null, '\t')}</div>;
};

export default UserDashBoard;

/* axios
      .get(config.API + '/users')
      .then((res) => setUserData(res.data[0]))
      .catch((err) => console.log(err)); */
/* 
      getAllUsers()
      .then((res) => setUserData(res[0]))
      .catch((err) => console.log(err)); */
