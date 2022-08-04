const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    email: String,
    fullname: String,
    password: String,
});
module.exports = mongoose.model('User', Schema);