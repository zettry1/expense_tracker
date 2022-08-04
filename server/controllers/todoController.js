const Todo = require("../models/todoModel")

async function addTodo(req, res, next) {
    try {
        const results = await Todo.create(req.body);
        res.json(results);
    } catch (error) {
        next(error);
    }

}

async function getTodos(req, res, next) {
    console.log(`getting todos..`)
    try {
        const results = await Todo.find({ 'user.user_id': req.user.user_id }, { description: 0 });
        res.json(results);
    } catch (error) {
        next(error);
    }
}

async function getTodoById(req, res, next) {
    try {
        const results = await Todo.findById(req.params.todo_id);
        res.json(results)
    } catch (error) {
        next(error);
    }

}

async function deleteTodoById(req, res, next) {
    try {
        const results = await Todo.deleteOne({ _id: req.params.todo_id });
        res.json(results);
    } catch (error) {
        next(error);
    }

}

async function updateTodoById(req, res, next) {
    try {
        console.log(req.body)
        const results = await Todo.updateOne({ _id: req.params.todo_id },
            { $set: { ...req.body } });
        res.json(results);
    } catch (error) {
        next(error);
    }

}
async function toggleTodoById(req, res, next) {
    try {
        const { completed } = req.query
        const results = await Todo.updateOne({ _id: req.params.todo_id },
            { $set: { completed } });
        res.json(results);
    } catch (error) {
        next(error);
    }

}
module.exports = {
    addTodo,
    getTodos,
    getTodoById,
    deleteTodoById,
    updateTodoById,
    toggleTodoById
}