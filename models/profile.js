const mongoose = require('mongoose');
const user= require('./user');

const userProfileSchema = new mongoose.Schema({
    user_id: String,
    firstname: String,
    lastname: String,
    email: String,
    role:String,
    birthday:{
        type: Date
    },
    address:{
        type: String
    },
    country:{
        type: String,
        trim: true
    },
    phoneNumber:{
        type: String,
        trim:true
    },
    interests:{
        type:String
    },
    expertise:{
        type:String
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
        date:String,
        message:String,
        sender_id:String
    }]
});

const Profile = mongoose.model('Profile', userProfileSchema);

module.exports = Profile;