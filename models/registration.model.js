const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RegSchema = mongoose.Schema({
    regId: {type: Number, unique: true},
    eventId: {type: Number},
    teamName: {type: String, required: true },
    teamDescription: String,
    teamMembers: [String]
}); 

EventSchema.plugin(AutoIncrement, {inc_field: 'eventId'});

module.exports = mongoose.model('Event',EventSchema);