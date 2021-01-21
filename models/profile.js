const mongoose = require('mongoose');
const user= require('./user');

const userProfileSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    username: String,
    role:String,
    birthday:{
        type: Date,
        required:[true, 'Birthday is required']
    },
    address:{
        type: String,
        required:[true, 'address is required']
    },
    state:{
        type: String,
        required: [true, 'state is required'],
        trim: true
    },
    phone:{
        type: String,
        trim:true
    },
    interests:{
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