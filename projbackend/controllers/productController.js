/* eslint-disable radix */
/* eslint-disable consistent-return */
const debug = require('debug')('app:productController');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

// Models
const ProductModel = require('../models/product');

// Populates the req.prodcuct object
exports.getProductById = (req, res, next, id) => {
  if (id.length < 12) {
    return res.status(400).json({
      error: 'Invalid id!',
    });
  }

  ProductModel.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: 'Product not found in DB!',
        });
      }
      debug('req.product populated!');
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    /* Fields will handle non-multipart type and has array of values
       file contains the files uploaded by user: array of files
    */

    if (err) {
      return res.status(400).json({
        error: `There is a problem with your file: ${file.photo.name}`,
      });
    }

    // Hanlde Fields here
    const { name, description, price, stock, category } = fields;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        error: 'Insufficient Data! Please select all * fields!',
      });
    }

    const product = new ProductModel(fields); // instance of model

    // Handle File here
    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(406).json({
          error: `${file.photo.name} file size should be less than 3MB`,
        });
      }

      // (check model) Add photo to product instance
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save it to DB
    product.save((dbErr, dbProduct) => {
      if (dbErr || !dbProduct) {
        return res.status(500).json({
          error: 'Unable to save the product in DB!',
          orig_msg: dbErr,
        });
      }

      // dbProduct found!
      return res.status(201).json(dbProduct);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined; // handled by photo mw
  res.status(200).json(req.product);
};

// MW: for sending only the photo of a product
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.status(200).send(req.product.photo.data);
  }
  next();
};

exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: `There is a problem with your file: ${file.photo.name}`,
      });
    }

    // get a product with latest updated field values
    /* producting is different from the product
      producting is not accepted by the mongoose as a instance
      and save() will not be found
      where as product is working, wierd don't know why
      So,while merging while dealing with instances of models,
      better to use loadash stuff
    */
    // const producting = { ...req.product._doc, ...fields };
    let { product } = req;
    product = _.extend(product, fields);

    // Handle File here
    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(406).json({
          error: `${file.photo.name} file size should be less than 3MB`,
        });
      }

      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save it to DB ...update in DB
    product.save((dbErr, dbProduct) => {
      if (dbErr || !dbProduct) {
        return res.status(500).json({
          error: 'Unable to save the product in DB!',
          orig_msg: dbErr,
        });
      }

      // dbProduct found!
      return res.json(dbProduct);
    });
  });
};

exports.removeProduct = (req, res) => {
  ProductModel.deleteOne({ _id: req.product._id }, (err) => {
    if (err) {
      return res.status(500).json({
        error: 'Failed to delete the product!',
        orig_err: err,
      });
    }

    return res.json({
      message: `${req.product.name} product deleted succesfully!`,
    });
  });
};

exports.getAllProducts = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 8;
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';

  ProductModel.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, allProducts) => {
      if (err || !allProducts) {
        res.status(400).json({
          error: 'No products found !',
        });
      }

      // Products Found!
      res.json(allProducts);
    });
};

// MW: Updates the stock and sold for all products in any given order!
exports.updateInventory = (req, res, next) => {
  const myOperations = req.body.order.products.map((prod) => ({
    updateOne: {
      filter: { _id: prod._id },
      update: { $inc: { stock: -prod.count, sold: +prod.count } },
    },
  }));

  ProductModel.bulkWrite(myOperations, {}, (err, results) => {
    if (err || !results) {
      res.status(400).json({
        error: 'Bulk Write operations failed!',
      });
    }
    next();
  });
};

exports.getAllUniqueCategories = (req, res) => {
  ProductModel.distinct('category', (err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: 'No distinct categories found in DB!',
        orig_err: err,
      });
    }

    // Category Found in DB!
    return res.json(category);
  });
};
