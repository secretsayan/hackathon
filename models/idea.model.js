const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const IdeaSchema = mongoose.Schema({
    ideaId: {type: Number, unique: true },
    eventId: {type: Number, required: true},
    teamId: {type: Number, required: true},
    description: {type: String, required: true },
    attachments: [{type: Number}],
}); 

EventSchema.plugin(AutoIncrement, {inc_field: 'ideaId'});

module.exports = mongoose.model('Idea',IdeaSchema);