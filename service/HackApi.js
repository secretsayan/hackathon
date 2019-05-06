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
            res['status'] = '400';
            res['message'] = 'Invalid Input '+ e;
            callback(res);
        }

    },
    insertEvent: async function (event, callback) {
        let res = [];
        try {
            let response = await Event.create(event);
            console.log(response);
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '400';
            res['message'] = 'Invalid Input '+ e;
            callback(res);
        }

    },
    getEventById: async function (id, callback) {
        let res = [];
        try {
            let response = await Event.findOne({ eventId: id });
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '400';
            res['message'] = 'Invalid Input '+ e;
            callback(res);
        }

    },
    updateEventById: async function (id, event, callback) {
        let res = [];
        try {
            let response = await Event.updateOne({ eventId: id }, event);
            res['status'] = '200';
            res['message'] = response;
            callback(res);
        }
        catch (e) {
            res['status'] = '400';
            res['message'] = 'Invalid Input '+ e;
            callback(res);
        }

    },
    deleteEventById: async function (id, callback) {
        let res = [];
        try{
            let response = await Event.deleteOne({ eventId: id });
            let data = await Event.find();
            res['status'] = '200';
            res['message'] = response;
            res['data'] = data;
            callback(res);
        }
        catch(e){
            res['status'] = '400';
            res['message'] = 'Invalid Input '+ e;
            callback(res);
        }


    },
    deleteMultiple: async function (ids, callback) {
        let res = [];
        try{
            let response = await Event.deleteMany({ eventId: ids });
            let data = await Event.find();
            res['status'] = '200';
            res['message'] = response;
            res['data'] = data;
            callback(res);
        }
        catch(e){
            res['status'] = '400';
            res['message'] = 'Invalid Input '+ e;
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
            res['status'] = '400';
            res['message'] = 'Login Failed! '+e;
            console.log('error'+e);
            callback(res);
        }
    },
    userProfile: async function(emailId, callback){
        let res = [];
        try {
            let response =  await User.findOne({email: emailId},{_id: 0,Role:0,__v:0,password:0});
            res['status'] = '200';
            res['message'] = response;
            callback(res);

        }
        catch (e) {
            res['status'] = '400';
            res['message'] = 'Login Failed! '+e;
            console.log('error'+e);
            callback(res);
        }

    },
    login: async function (userEmail,userPassword,callback){
        let res = [];
        try{
            let response = await User.findOne({email: userEmail,password: userPassword},{firstname:1,role:1,_id:0});
            res["message"] = response;
            callback(res);
        }
        catch (e){
            console.log(e);
            res['status'] = '400';
            res['message'] = 'Login Failed! '+e;
            console.log('error'+e);

        }
    },
    manageHackList: async function(userEmail, callback){
        let res = [];
        try{
            res['status'] = '200';
            let response = await Event.findOne({hackathonHost: userEmail});
            res["message"] = response;
            callback(res);
        }
        catch (e){
            res['status'] = '400';
            res['message'] = 'Failed '+e;
            console.log('error'+e);

        }
    } 

};