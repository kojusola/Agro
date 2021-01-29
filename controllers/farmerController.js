const Profile = require("../models/profile")

exports.getFarmers =  async (req, res, next) => {
    const profiles = await Profile.find()
    res.render('farmers.hbs', {profiles})
}