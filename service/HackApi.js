const Event = require('../models/events.model');
module.exports = {
    getAllEvents : async function (callback){
        let response = await Event.find();
        callback(response);
    },
    insertEvent : async function (issue , callback){
        let response = await Event.insertMany(issue);
        callback(response);
    }
};