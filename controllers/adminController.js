const User = require("../models/user");
const Profile = require("./../models/profile")
const catchAsync = require("./../utils/catchAsync")



exports.getAllProfile= catchAsync(async(req, res) =>{
    const profiles = await Profile.find();
    res.render('dashboard', {profiles})
})


exports.verifyProfile = catchAsync(async (req, res, next) => {
    await Profile.findByIdAndUpdate(req.params.id, { verified: true }, { new: true })
    req.flash("success", "Profile successfully updated")
    res.redirect("/admin")
})


exports.deleteProfile = catchAsync(async (req, res, next) => {
    const profile = await Profile.findById(req.params.id)
    await User.findByIdAndDelete(profile.user_id)
    await Profile.findByIdAndDelete(req.params.id)
    res.status(200).json({
        "status":"success"
    })
})

