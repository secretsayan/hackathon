const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true},
    firstname: String,
    lastname: String,
    location: String,
    mobile: Number,
    role: [{ type: String, default: 'user' }]
}); 

module.exports = mongoose.model('User',UserSchema);