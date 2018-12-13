const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const EventSchema = mongoose.Schema({
    id: Number,
    name: String,
    startDate: String,
    endDate: String,
    status: String,
    description: String,
    noOfTeams: String,
    maxTeamSize: String,
    prizes: String
}); 

EventSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Event',EventSchema);