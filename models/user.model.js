const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    firstname: String,
    lastname: String,
    Location: String,
    Mobile: Number,
}); 

module.exports = mongoose.model('User',UserSchema);