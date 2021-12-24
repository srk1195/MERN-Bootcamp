/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const debug = require('debug')('app:userController');
const User = require('../models/user');
const { Order } = require('../models/order');

exports.getUserById = (req, res, next, id) => {
  if (id.length < 12) {
    return res.status(400).json({
      error: 'Invalid id!',
    });
  }

  // Types.ObjectId() converts anything to mongo object Id
  User.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: 'Requested user not found in DB!',
      });
    }
    // user found!
    debug('req.profile populated!');

    // Only expose what needed !
    const { _id, name, roles, purchases, lastname, email } = user;
    req.profile = {
      _id,
      name,
      roles,
      purchases,
      lastname,
      email,
    };

    next();
  });
};

exports.getUser = (req, res) => {
  res.status(200).json(req.profile);
};

exports.updateUser = (req, res) => {
  if (req.profile && req.body) {
    // update the User!
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body }, // req.body comes from the form data!
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: 'Updation Failed!',
          });
        }

        // User Found!
        const { _id, name, roles, purchases, lastname, email } = user;
        const result = {
          _id,
          name,
          roles,
          purchases,
          lastname,
          email,
        };
        debug('User updated!');
        return res.status(202).json(result);
      }
    );
  } else {
    return res.status(400).json({
      error: 'Insufficient Data!',
    });
  }
};

exports.getAllUsers = (req, res) => {
  User.find((err, users) => {
    if (err || !users) {
      return res.status(400).json({ error: 'no users found!' });
    }
    return res.json(users);
  });
};

exports.userPurchaseArray = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: 'No Orders found for this account!',
        });
      }

      // order Found!
      return res.json(order);
    });
};

// Middleware : To fill the purchases array in Order model.
exports.pushOrderInPurchaseArray = (req, res, next) => {
  const localPurchases = [];

  req.body.order.products.forEach((item) => {
    localPurchases.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
      status: req.body.order.status,
    });
  });

  // save it to DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: localPurchases } },
    { new: true },
    (err, purchases) => {
      debug(purchases);
      if (err || !purchases) {
        return res.status(400).json({
          error: 'Unable to save purchases list in DB!',
        });
      }
    }
  );

  next();
};
