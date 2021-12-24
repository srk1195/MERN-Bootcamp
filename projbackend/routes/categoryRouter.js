const express = require('express');

const categoryRouter = express.Router();

// Controllers
const categoryController = require('../controllers/categoryController');
const userController = require('../controllers/userController');
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require('../controllers/authController')();

/* Param extractors! */
// MW: Populates the req.profile object
categoryRouter.param('userId', userController.getUserById);

// MW: Populates the req.category object
categoryRouter.param('categoryId', categoryController.getCategoryById);

/*  Routes from here! */

// create Routes
categoryRouter.post(
  '/category/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  categoryController.createCategory
);

// Read routes
categoryRouter.get('/category/:categoryId', categoryController.getCategory);
categoryRouter.get('/categories', categoryController.getAllCategories);

// Modifying Routes
categoryRouter.put(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  categoryController.updateCategory
);

categoryRouter.delete(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  categoryController.deleteCategory
);

module.exports = categoryRouter;
