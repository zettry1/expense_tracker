const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
module.exports = mongoose.model('Category', Schema);