const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    id: Number,
    name: String,
    startDate: String,
    endDate: String,
    status: String,
    description: String,
    noOfTeams: String[],
    maxTeamSize: String[],
    prizes: String
}); 

module.exports = mongoose.model('Event',EventSchema);