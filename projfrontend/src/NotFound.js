import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-white ">
      Error! Page Not Found!
      <p>
        Go to
        <Link to="/"> Home Page</Link>
      </p>
    </div>
  );
};

export default NotFound;
