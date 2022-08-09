const Category = require("../models/categoryModel");

async function addCategory(req, res, next) {

  try {
    const { name } = req.body;
    console.log(name);
    const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
    const category = new Category({
      name,
      imagePath,
    });
    console.log("Temka", category)
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
    console.log(results);
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
