const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const checkToken = require('./middlewares/checkToken');
const expenseRouter = require('./routers/expenseRouter');
const categoryRouter = require('./routers/categoryRouter')

const app = express();
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/expense', checkToken, expenseRouter);
app.use('/categories', checkToken, categoryRouter)
app.use('/users', require('./routers/userRouter'));

app.use((req, res, next) => {
    next(new Error('Route Not Found'));
})

app.use((err, req, res, next) => {
    res.status(500).json({ error: err })
});

app.listen(3000, () => console.log('Service for Expense Track  starting and Listening on port 3000'));