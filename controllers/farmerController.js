const Profile = require("../models/profile")

exports.getFarmers =  async (req, res, next) => {
    const profiles = await Profile.find({role:'farmer'})
    res.render('farmers.hbs', {profiles})
}