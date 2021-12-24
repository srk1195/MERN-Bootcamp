import PropTypes from 'prop-types';
import React from 'react';
import config from '../../config';

const ImageCard = ({ productID }) => {
    const imageURL = productID
        ? `${config.API}/product/photo/${productID}`
        : 'https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

    return (
        <div className="rounded border-custom p-2">
            <img
                src={imageURL}
                alt="Products"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                className="mb-0 rounded"
            />
        </div>
    );
};

ImageCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
    }),
    productID: PropTypes.string,
};

export default ImageCard;
