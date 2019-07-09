const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RegSchema = mongoose.Schema({
    regId: {type: Number, unique: true},
    eventId: String,     
    teamName: {type: String, required: true },
    teamDescription: String,
    teamMembers: [String]
}); 

RegSchema.plugin(AutoIncrement, {inc_field: 'regId'});

module.exports = mongoose.model('Reg',RegSchema);