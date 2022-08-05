const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: String,
    description: String,
    total: Number,
    date: { type: Date, default: Date.now },
    category: { categ_id: mongoose.Types.ObjectId , name: String },
    user: { user_id: mongoose.Types.ObjectId, fullname: String }
});
module.exports = mongoose.model('Expense', Schema);