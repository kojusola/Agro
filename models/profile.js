const mongoose = require('mongoose');
const user= require('./user');
const dateFormat = require("dateformat");

const userProfileSchema = new mongoose.Schema({
    user_id: String,
    firstname: String,
    lastname: String,
    email: String,
    role:String,
    birthday:{
        type: Number
    },
    state:{
        type: String,
        required: [true, 'state is required'],
        trim: true
    },
    phoneNumber:{
        type: String,
        trim:true
    },
    profession: String,
    languages:{
        type:String
    },
    landnumber:{
        type:Number
    },
    majorproduce:{
        type:String
    },
    yrexperience:{
        type:Number
    },
    aboutyou:{
        type:String
    },
    profileimage: String,
    verified:{
        type: Boolean,
        default: false
    },
    messages:[{
        sender: String,
        receiver: String,
        date: String,
        message:String,
        node:String
    }]
});

const Profile = mongoose.model('Profile', userProfileSchema);

module.exports = Profile;