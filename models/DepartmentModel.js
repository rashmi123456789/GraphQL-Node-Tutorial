const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Department = new schema({
    name:String,
    tel:String,
})

module.exports = mongoose.model('Department',Department);