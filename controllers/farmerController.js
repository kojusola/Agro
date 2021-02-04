const Profile = require("../models/profile")

const catchAsync = require("./../utils/catchAsync")

exports.getFarmers = catchAsync(async (req, res, next) => {
    const profiles = await Profile.find({role:'farmer', verified: true})
    res.render('farmers.hbs', {profiles, 'title': 'Farmers | AGROTECH'})
})