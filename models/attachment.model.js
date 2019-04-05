const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AttachmentSchema = mongoose.Schema({
    attachmentId: {type: Number, unique: true },
    type: {type: String, required: true},
    path: {type: String, required: true}
}); 

EventSchema.plugin(AutoIncrement, {inc_field: 'attachmentId'});

module.exports = mongoose.model('Attachment',AttachmentSchema);