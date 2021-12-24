const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    category: {
      type: ObjectId,
      ref: 'Category', // Supply a model Name of the another collection
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
