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
        type: Date
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
    profileimage:{
        type: Object,
        "avatar":{
            type:String
        },
        "cloundinary_id":{
            type:String
        }
    },
    farmimage:[{
        type: Object,
        "avatar":{
            type:String
        },
        "cloundinary_id":{
            type:String
        }
    }],
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