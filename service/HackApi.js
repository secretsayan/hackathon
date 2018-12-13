const Event = require('../models/events.model');
module.exports = {
    getAllEvents : async function (callback){
        let response = await Event.find();
        callback(response);
    },
    insertEvent : async function (issue, callback){
        let response = await Event.create(issue);
        callback(response);
    },
    getEventById : async function(id, callback){
        let response = await Event.find({id: id});
        callback(response);
    },
    updateEventById : async function (id, issue, callback){
        let response =  await Event.findOneAndUpdate({id: id},issue);
        callback(response);
    },
    deleteEventById : async function(id, callback){
        let response = await Event.deleteOne({id: id});
        let data = await Event.find();
        callback(data);

    },
    deleteMultiple : async function(ids, callback){
        let response = await Event.deleteMany({id: ids});
        let data = await Event.find();
        callback(data);
    }

};