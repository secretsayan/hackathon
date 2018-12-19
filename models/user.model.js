const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstname: String,
    lastname: String,
    Location: String,
    Mobile: Number,
    Role: String
}); 

module.exports = mongoose.model('User',UserSchema);