const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EventSchema = mongoose.Schema({
    eventId: {type: Number, unique: true},
    name: {type: String, required: true },
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    status: {type: String, required: true},
    description: String,
    noOfTeams: {type: Number, required: true},
    maxTeamSize: {type: Number, required: true},
    prizes: String,
    hackathonHost: {type: String, required: true}
}); 

EventSchema.plugin(AutoIncrement, {inc_field: 'eventId'});

module.exports = mongoose.model('Event',EventSchema);