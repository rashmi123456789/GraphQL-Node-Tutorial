const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Position = new schema({
    name:String,
    salary:String
})

module.exports = mongoose.model('Position',Position);