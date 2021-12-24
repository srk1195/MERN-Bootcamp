/* eslint-disable indent */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const debug = require('debug')('Model:User');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    lastname: {
      type: String,
      required: false,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    roles: {
      type: Number,
      default: 0, // higher the number higher the privilages.
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtual on the user schema
// ex: [any_doc].password = "Rahul123" // set method
userSchema
  .virtual('password')
  .set(function setPass(password) {
    (this._password = password),
      // Saving the salt to DB
      (this.salt = uuidv4()),
      // setting the encry_password field which is stored to database.
      (this.encry_password = this.securePassword(this._password));
  })
  .get(function getPass() {
    return this._password;
  });

// methods on the user schema
userSchema.methods = {
  authenticate(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },
  securePassword(plainpassword) {
    try {
      if (!plainpassword) return '';
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex');
    } catch (err) {
      debug(err);
      return '';
    }
  },
};

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;
