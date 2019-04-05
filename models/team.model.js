const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TeamSchema = mongoose.Schema({
    teamId: {type: Number, unique: true },
    name: {type: String, required: true },
    members: [{type: String}],
    eventsEnrolled: [{type: Number}],
    noOfMembers: {type: Number},
}); 

EventSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('Team',TeamSchema);