const express = require('express');
const { getTodos, getTodoById, deleteTodoById, updateTodoById, addTodo, toggleTodoById } = require('../controllers/todoController');
const router = express.Router();
// /todos
router.get('/', getTodos);
router.get('/:todo_id', getTodoById);
router.delete('/:todo_id', deleteTodoById);
router.put('/:todo_id', updateTodoById);
router.post('/', addTodo);

router.patch('/:todo_id', toggleTodoById);
module.exports = router;