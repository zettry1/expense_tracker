const Category = require("../models/categoryModel");

async function addCategory(req, res, next) {
  try {
    const results = await Category.create(req.body);
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function getCategories(req, res, next) {
  try {
    const results = await Category.find({});
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const results = await Category.findById(req.params.categ_id);
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function deleteCategoryById(req, res, next) {
  try {
    const results = await Category.deleteOne({ _id: req.params.categ_id });
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function updateCategoryById(req, res, next) {
  try {
    console.log(req.body);
    const results = await Category.updateOne(
      { _id: req.params.categ_id },
      { $set: { ...req.body } }
    );
    res.json(results);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
