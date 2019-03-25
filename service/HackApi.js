const Event = require('../models/events.model');
const User = require('../models/user.model');

module.exports = {
    getAllEvents: async function (callback) {
        let res = [];
        try {
            let response = await Event.find();            
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '502';
            res['message'] = 'Exception Occured';
            callback(res);
        }

    },
    insertEvent: async function (issue, callback) {
        let res = [];
        try {
            let response = await Event.create(issue);
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '502';
            res['message'] = 'Exception Occured';
            callback(res);
        }

    },
    getEventById: async function (id, callback) {
        let res = [];
        try {
            let response = await Event.find({ id: id });
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '502';
            res['message'] = 'Exception Occured';
            callback(res);
        }

    },
    updateEventById: async function (id, issue, callback) {
        let res = [];
        try {
            let response = await Event.findOneAndUpdate({ id: id }, issue);
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '502';
            res['message'] = 'Exception Occured';
            callback(res);
        }

    },
    deleteEventById: async function (id, callback) {
        let res = [];
        try{
            let response = await Event.deleteOne({ id: id });
            let data = await Event.find();
            res['status'] = '200';
            res['message'] = response;
            res['data'] = data;
            callback(res);
        }
        catch(e){
            res['status'] = '502';
            res['message'] = 'Exception Occured';
            callback(res);
        }


    },
    deleteMultiple: async function (ids, callback) {
        let res = [];
        try{
            let response = await Event.deleteMany({ id: ids });
            let data = await Event.find();
            res['status'] = '200';
            res['message'] = response;
            res['data'] = data;
            callback(res);
        }
        catch(e){
            res['status'] = '502';
            res['message'] = 'Exception Occured';
            callback(res);
        }

    },
    createUser: async function (values, callback) {
        let res = [];
        try {
            let response = await User.create(values);
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '502';
            res['message'] = 'Registration Failed ! Please re-enter data correctly.';
            console.log('error'+e);
            callback(res);
        }
    }
};