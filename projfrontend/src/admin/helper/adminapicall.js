import config from '../../config';

const debug = require('debug')('front:API_Calls :airplane:');
/* Category Calls */

// Make a category
export const createCategory = (userId, token, category) =>
    fetch(`${config.API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then((response) => response.json())
        .catch((err) => debug(err));

// Get  a single category by ID.
export const getACategory = (categoryId) =>
    fetch(`${config.API}category/${categoryId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

// get All categories
export const getAllCategories = () =>
    fetch(`${config.API}categories`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

// Delete A category
export const removeCategory = (userId, token, categoryId) =>
    fetch(`${config.API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

// Update a category

export const updateTheCategory = (userId, token, categoryId, categoryName) =>
    fetch(`${config.API}category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryName),
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

/* Product Calls */

// add a new product
export const createProduct = (userId, token, product) =>
    fetch(`${config.API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

// Get all products
export const getAllProducts = () =>
    fetch(`${config.API}/products`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

// get a single product
export const getProduct = (productId) =>
    fetch(`${config.API}/product/${productId}`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

// delete a product
export const deleteProduct = (productId, userId, token) =>
    fetch(`${config.API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .catch((error) => debug(error));

// update a product
export const updateProduct = (productId, userId, token, product) =>
    fetch(`${config.API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: product,
    })
        .then((response) => response.json())
        .catch((error) => debug(error));
