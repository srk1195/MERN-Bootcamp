/* eslint-disable consistent-return */
const debug = require('debug')('app:categoryController');
const CategoryModel = require('../models/category');

// MW
exports.getCategoryById = (req, res, next, id) => {
  if (id.length < 12) {
    return res.status(400).json({
      error: 'Invalid id!',
    });
  }

  CategoryModel.findById(id, (err, cateItem) => {
    if (err || !cateItem) {
      return res.status(400).json({
        error: 'No category found in DB!',
      });
    }
    debug('req.category populated!');
    req.category = cateItem;
    next();
  });
};

// Creates a category in DB by ADMIN!
exports.createCategory = (req, res) => {
  const newCategory = new CategoryModel(req.body);
  newCategory.save((err, cateItem) => {
    if (err || !cateItem) {
      return res.status(400).json({
        error: 'Unable to create a category into DB!',
        orig_err: err,
      });
    }

    // category found!
    return res.status(201).json(cateItem);
  });
};

// returns a category
exports.getCategory = (req, res) => res.status(200).json(req.category);

exports.getAllCategories = (req, res) => {
  CategoryModel.find().exec((err, categoriesItems) => {
    if (err || !categoriesItems) {
      return res.status(400).json({
        error: 'Unable to list all categories!',
        orig_err: err,
      });
    }

    // Categories found!
    res.json(categoriesItems);
  });
};

exports.updateCategory = (req, res) => {
  CategoryModel.findByIdAndUpdate(
    { _id: req.category._id },
    {
      $set: req.body,
    },
    { new: true, useFindAndModify: false },
    (err, updatedCategory) => {
      if (err || !updatedCategory) {
        return res.status(400).json({
          error: `Failed to update the category: ${req.category.name}`,
          orig_err: err,
        });
      }

      return res.status(200).json(updatedCategory);
    }
  );
};

exports.deleteCategory = (req, res) => {
  CategoryModel.deleteOne({ _id: req.category._id }, (err) => {
    if (err) {
      return res.status(500).json({
        error: 'Failed to delete the category!',
        orig_err: err,
      });
    }

    return res.json({
      message: `${req.category.name} category deleted succesfully!`,
    });
  });
};
