const Profile = require("../models/profile")

exports.getFarmers =  async (req, res, next) => {
    const profiles = await Profile.find({role:'farmer', verified: true})
    res.render('farmers.hbs', {profiles})
}