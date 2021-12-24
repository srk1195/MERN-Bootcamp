const express = require('express');

const userRouter = express.Router();

// controllers!
const userController = require('../controllers/userController');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authController')();

// This route populates the req.profile obj
// This cb gets called only once per req-res lifecycle.
// gets triggered if any route is having userId as param.!
userRouter.param('userId', userController.getUserById);

userRouter.get(
  '/user/:userId',
  isSignedIn,
  isAuthenticated,
  userController.getUser
);

userRouter.put(
  '/user/:userId',
  isSignedIn,
  isAuthenticated,
  userController.updateUser
);

userRouter.get('/users', userController.getAllUsers);

userRouter.get(
  '/user/orders/:userId',
  isSignedIn,
  isAuthenticated,
  userController.userPurchaseArray
);

module.exports = userRouter;
