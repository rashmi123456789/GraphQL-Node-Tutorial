const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Employee = new schema({
    name:String,
    age:Number,
    deptId:String,
    positionId:String
})

module.exports = mongoose.model('Employee',Employee);