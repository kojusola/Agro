const user = require("../models/user");
const Profile = require("../models/profile");
const passport = require("passport");
const mongoose = require('mongoose')
const catchAsync = require("./../utils/catchAsync")



exports.userLoginForm =catchAsync(async (req, res, next) => {
    if (req.user) {
        req.flash("error", "Already signed in!");
        return res.redirect("back")
    }
    res.render('signin.hbs', { 'title': 'Login | AGROTECH'})
})

exports.userSignupForm = catchAsync(async (req, res, next) => {
    if (req.user) {
        req.flash("error", "Currently signed in. Please log out!");
        return res.redirect("back")
    }
    res.render('signup.hbs', { 'title': 'Register | AGROTECH'})
})


exports.signup = catchAsync(async (req, res, next) => {
    if (req.user) {
        req.flash("error", "Already signed in!");
        return res.redirect("back")
    }
            const newUser = new user({
                username: req.body.username,
                role: req.body.role
            })
            const createdUser = await user.register(newUser, req.body.password);
            if(createdUser){
                passport.authenticate('local', function (error, user, info) {
                console.log(user)
                if (error) {
                    req.flash("error", "Invalid credentials");
                    return res.redirect("back")
                } else if (!user) {
                    req.flash("error", "Invalid credentials");
                    // console.log(user)
                    return res.redirect("back")
                } else {
                    req.login(user, (err) => {
                    if (err) {
                            req.flash("error", "Something went wrong!");
                            return res.redirect("back")
                        } else {
                            req.flash("success", "Welcome! Kindly complete your profile");
                            return res.redirect(`/profile`);
                        }
                    })
                }
              })(req, res, next);
            }
        
})


exports.login = catchAsync(async (req, res, next) => {
    if (req.user) {
        req.flash("error", "Already signed in!");
        return res.redirect("back")
    }
    passport.authenticate('local', function (error, user, info) {
        console.log(user)
        if (error) {
            req.flash("error", "Invalid credentials");
            return res.redirect("back")
        } else if (!user) {
            req.flash("error", "Invalid credentials");
            // console.log(user)
            return res.redirect("back")
        } else {
            req.login(user, (err) => {
            if (err) {
                    req.flash("error", "Something went wrong!");
                    return res.redirect("back")
                } else {
                    Profile.find({user_id:user._id}).then((data)=>{
                        console.log(data)
                        if(data.length == 0){
                            req.flash("success", "Welcome! Kindly complete your profile");
                            return res.redirect(`/profile`);
                        }
                        else if(user.role == 'investor'){
                            req.flash("success", "Welcome!!!");
                            return res.redirect(`/`);
                        }else{
                            req.flash("success", "Successfully logged In!");
                            return res.redirect(`/profile/${data[0].user_id}`);
                        }

                    })
                    .catch(err=>{
                        req.flash("success", "Welcome! Kindly complete your profile");
                        return res.redirect(`/profile`);
                    })
                }
            })
        }
      })(req, res, next);
   
}

)

exports.logout = catchAsync(async (req, res, next) => {
    req.logout()
    req.flash("success", "Logged out successfully");
    res.redirect("/")
})