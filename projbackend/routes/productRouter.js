const express = require('express');

const productRouter = express.Router();

// Controllers
const userController = require('../controllers/userController');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authController')();

const productController = require('../controllers/productController');

// MW: all of the Params
productRouter.param('userId', userController.getUserById);
productRouter.param('productId', productController.getProductById);

/* Actual Routes */
// Create
productRouter.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  productController.createProduct
);

//  Gets the all information of a product but not photos
productRouter.get('/product/:productId', productController.getProduct);
// Gets only the photo of a product
productRouter.get('/product/photo/:productId', productController.photo);

// Update Route
productRouter.put(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  productController.updateProduct
);

// Delete Route
productRouter.delete(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  productController.removeProduct
);

// Listing Route
productRouter.get('/products', productController.getAllProducts);
productRouter.get(
  '/products/categories',
  productController.getAllUniqueCategories
);

module.exports = productRouter;

// Express validaiton doesnt work in this case!
/* [
    checkBody('name')
      .isLength({ min: 1 })
      .withMessage('Name of the product is required!'),
    checkBody('description')
      .isLength({ min: 5 })
      .withMessage('Description should be required with atleast 5 charecters!'),
    checkBody('price').notEmpty().withMessage('Price should be mentioned!'),
    checkBody('stock').notEmpty().withMessage('Stock should be mentioned!'),
    checkBody('category').notEmpty().withMessage('Category needed for tshirt!'),
    checkBody('photo').notEmpty().withMessage('Photo should be needed!'),
  ] */
