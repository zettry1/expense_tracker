const Category = require("../models/categoryModel");

async function addCategory(req, res, next) {
  try {
    const { name } = req.body;
    const imagePath = process.env.image_path + req.file.filename; // Note: set path dynamically
    const category = new Category({
      name,
      imagePath,
    });
    const createdCategory = await category.save();
    res.status(200).json({
      category: {
        ...createdCategory._doc,
      },
    });
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
