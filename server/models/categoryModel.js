const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: { type: String, required:true},
    imagePath: { type: String, required:true},
});
module.exports = mongoose.model('Category', Schema);