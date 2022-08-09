const express = require('express');
const { getCategories, getCategoryById, deleteCategoryById, updateCategoryById, addCategory } = require('../controllers/categoryController');
const storage = require('../helpers/storage');
const router = express.Router();

// /categs
router.get('/', getCategories);
router.get('/:categ_id', getCategoryById);
router.delete('/:categ_id', deleteCategoryById);
router.patch('/:categ_id', updateCategoryById);
router.post('/', storage, addCategory);

module.exports = router;