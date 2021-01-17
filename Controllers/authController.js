const user = require("../models/user");
const passport = require("passport");


exports.signup = async (req, res) =>{
        // const role = req.body.role
        // if (role === "farmer"){
            const newUser = new user({
                name: req.body.name,
                username: req.body.username,
                role: req.body.role,
                location: req.body.location,
                country: req.body.country,
                address: req.body.address,
                birthday:req.body.birthday,
            })
            const createdUser = await user.register(newUser, req.body.password);
            return res.redirect("/auth/login") 
            // return res.json({
            //     user:createdUser
            // })
        // }else{
        //     const newUser = new investor({
        //         name: req.body.name,
        //         username: req.body.username,
        //         role: req.body.role,
        //         location: req.body.location,
        //     })
        //     const createdUser = await investor.register(newUser, req.body.password);
        //     return res.redirect("/auth/login") 
        //     // return res.json({
        //     //     user:createdUser
        //     // })
        // }
        // //return res.redirect("/auth/login") 
        // // return res.json({
        // //     user:createdUser
        // // })
}


exports.login = async (req, res, next) => {
//    const role = req.body.role
   console.log(req.body)
//    if(role === "investor"){
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
            req.logIn(user, (err) => {
            if (err) {
                    req.flash("error", "Something went wrong!");
                    return res.redirect("back")
                } else {
                    req.flash("success", "Successfully logged In!");
                    return res.redirect("/")
                }
            })
        }
      })(req, res, next);
    // }else{
    //         passport.authenticate('farmerLocal', function (error, user, info) {
    //             // console.log(user)
    //             if (error) {
    //                 req.flash("error", "Invalid credentials");
    //                 return res.redirect("back")
    //             } else if (!user) {
    //                 req.flash("error", "Invalid credentials");
    //                 // console.log(user)
    //                 return res.redirect("back")
    //             } else {
    //                 req.logIn(user, (err) => {
    //                 if (err) {
    //                         req.flash("error", "Something went wrong!");
    //                         return res.redirect("back")
    //                     } else {
    //                         req.flash("success", "Successfully logged In!");
    //                         return res.redirect("/")
    //                     }
    //                 })
    //             }
    //           })(req, res, next);
    // }
}


exports.logout = async (req, res, next) => {
    req.logout()
    req.flash("success", "Logged out successfully");
    res.redirect("/")
}