const express = require('express');

const orderRouter = express.Router();

// Controllers
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authController')();

// Param extractors!

orderRouter.param('userId', userController.getUserById);
orderRouter.param('orderId', orderController.getOrderById);

/* ROUTES */
// create
orderRouter.post(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  userController.pushOrderInPurchaseArray,
  productController.updateInventory,
  orderController.createOrder
);

// read
orderRouter.get(
  '/order/all/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  orderController.getAllOrders
);

// Listing
orderRouter.get(
  '/order/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  orderController.getOrderStatus
);

orderRouter.put(
  '/order/:orderId/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  orderController.updateStatus
);

module.exports = orderRouter;
