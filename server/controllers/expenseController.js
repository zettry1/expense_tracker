const Expense = require("../models/expenseModel");

async function addExpense(req, res, next) {
  try {
    console.log("req.body", req.body);
    const results = await Expense.create(req.body);
    res.json(results);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
}

async function getExpenses(req, res, next) {
  try {
    const results = await Expense
      .find
      //   { "user.user_id": req.user.user_id },
      //   { description: 0 }
      ();
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function getExpensesByDate(req, res, next) {
  try {
    const results = await Expense.find(
      { "user.user_id": req.user.user_id },
      { date: req.body.date }
    );
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function getExpenseById(req, res, next) {
  try {
    const results = await Expense.findById(req.params.expense_id);
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function deleteExpenseById(req, res, next) {
  try {
    const results = await Expense.deleteOne({ _id: req.params.expense_id });
    res.json(results);
  } catch (error) {
    next(error);
  }
}

async function updateExpenseById(req, res, next) {
  try {
    const results = await Expense.updateOne(
      { _id: req.params.expense_id },
      { $set: { ...req.body } }
    );
    res.json(results);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
}
module.exports = {
  addExpense,
  getExpenses,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
  getExpensesByDate,
};
