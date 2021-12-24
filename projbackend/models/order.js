const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

// Schemas
const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product', // supply a model name
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    status: {
      type: String,
      default: 'Received',
      enum: ['Cancelled', 'Received', 'Delivered', 'shipped', 'processing'],
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// models
const ProductCart = mongoose.model('ProductCart', productCartSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, ProductCart };
