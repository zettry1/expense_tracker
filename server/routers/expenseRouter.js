const express = require('express');
const { addExpense, getExpenses, getExpensesByDate, getExpenseById, deleteExpenseById, updateExpenseById} = require('../controllers/expenseController');

const router = express.Router();

router.get('/', getExpenses);
router.get('/search', getExpensesByDate);
router.get('/:expense_id', getExpenseById);
router.post('/', addExpense);
router.patch('/:expense_id', updateExpenseById);
router.delete('/:expense_id', deleteExpenseById);

module.exports = router;