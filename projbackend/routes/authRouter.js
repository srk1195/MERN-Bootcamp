/* eslint-disable object-curly-newline */
const debug = require('debug')('app:authRouter');
const express = require('express');
const { body: checkBody } = require('express-validator');
const authController = require('../controllers/authController')();

const authRouter = express.Router();

function router() {
  // Controllers
  const { signout, signin, signup, isSignedIn } = authController;

  authRouter.get('/signout', signout);
  authRouter.post(
    '/signup',
    [
      checkBody('name')
        .isLength({ min: 3 })
        .withMessage('Name Must be in 3 charecter long!'),
      checkBody('email').isEmail().withMessage('Email is required!'),
      checkBody('password')
        .isLength({ min: 4, max: 30 })
        .withMessage('Password must be 4-30 charecter long!'),
    ],
    signup
  );
  authRouter.post(
    '/signin',
    [
      checkBody('email').isEmail().withMessage('Email is required!'),
      checkBody('password')
        .notEmpty()
        .withMessage('Password is required dude!'),
    ],
    signin
  );

  // isSignedIn middleware only passes if a valid token is found in headers
  // with this schema -> Authorization : Bearer <jwt>
  authRouter.get('/protected', isSignedIn, (req, res) => {
    res.json({
      message: 'Protected Route!!!!',
      auth_info: req.auth,
    });
  });

  return authRouter;
}

module.exports = router;
