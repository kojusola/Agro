const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const dateFormat = require("dateformat");
const profile = require("./profile");

var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for a user'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Email is required for a user'],
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        trim:true,
        required:[true, 'Role is required']
    },
    password: {
        type: String,
        select: false
    },
    joined:{
        type: String,
        default: dateFormat(Date.now(), 'fullDate')
    }  
})
userSchema.plugin(passportLocalMongoose, options);


const User = mongoose.model('User', userSchema);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));
passport.authenticate('local', {failureFlash: 'Invalid username or password.'})
passport.authenticate('local', {successFlash: 'Welcome!'})


module.exports = User
