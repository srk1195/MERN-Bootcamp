/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
const debug = require('debug')('app:authController');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const User = require('../models/user');

function authController() {
  const signup = (req, res) => {
    // Validating the req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // debug(typeof errors, errors);

      return res.status(422).json({
        err_msg: errors.errors[0].msg,
        field: errors.errors[0].param,
      });
    }

    // saving user to db if no errors
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        debug(err);
        return res.status(400).json({
          error: 'Unable to save user to DB',
        });
      }

      return res.status(201).json(user);
    });
  };

  function signin(req, res) {
    // Validating the req
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(412).json({
        error: validationErrors.errors[0].msg,
        field: validationErrors.errors[0].param,
      });
    }

    // Finding the user in DB
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: 'User not found in DB!',
        });
      }

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: 'Email and Password doesnt Match',
        });
      }

      /*  User found! */
      // Create a token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: '1h',
      });

      // Verify token expiry!
      /* setTimeout(() => {
        const verify = jwt.verify(token, process.env.SECRET);
        debug(verify, 'Verify statuse');
      }, 100); */

      // Put token into a cookie
      res.cookie('userToken', token, { expire: new Date() + 9999 });

      // Send repsone to front-end
      const { _id, email: emailId, name, roles } = user;
      return res.status(200).json({
        token,
        user: {
          _id,
          emailId,
          name,
          roles,
        },
      });
    });

    return res.status(204);
  }

  const signout = (req, res) => {
    res.clearCookie('userToken');
    return res.status(202).json({
      message: 'Sign Out Completed!',
    });
  };

  /* PROTECTED ROUTES */
  // used as middleware function to check user is signed In or not!
  // Use the same secret that is being used to signIn.
  // It takes the token from headers and validates and call next() if it is OK.
  const isSignedIn = expressJwt({
    secret: process.env.SECRET,
    // puts the auth as property(contents which are used for signing the token)
    // on req object once verified
    userProperty: 'auth',
    algorithms: ['HS256'],
  });

  /* Custom Middlewares */

  const isAuthenticated = (req, res, next) => {
    // Profile will be set from front-end
    // The front-end gets data from sign-in  response. check sign-in function!
    // req.profile is populated by userController.getUserById()
    const checker =
      req.profile && req.auth && String(req.profile._id) === req.auth._id;

    if (!checker || !mongoose.isValidObjectId(req.profile._id)) {
      return res.status(401).json({
        error: 'Un-athenticated..!',
      });
    }
    next();
  };
  const isAdmin = (req, res, next) => {
    if (req.profile.roles === 0) {
      return res.status(401).json({
        error: 'Gotcha!! You should have Admin access',
      });
    }
    next();
  };

  return { signout, signup, signin, isSignedIn, isAuthenticated, isAdmin };
}

module.exports = authController;
