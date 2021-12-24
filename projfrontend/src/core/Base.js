import PropTypes from 'prop-types';
import React from 'react';
import Menu from './Menu';
import Footer from './Footer';

const Base = ({
    title = 'My title',
    description = 'My Description',
    className = 'bg-dark text-white p-4',
    children,
}) => (
    <>
        <Menu />
        <div>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>

                    {/* children here is Props children! */}
                    <div className={className}>{children}</div>
                </div>
            </div>
        </div>
        <Footer />
    </>
);

Base.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
};

export default Base;
