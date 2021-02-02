const Profile = require("./../models/profile")

exports.admin = async (req, res, next) => {
    res.render('dashboard.hbs')
}

exports.getAllProfile= async(req, res) =>{
    const profiles = await Profile.find();
    if(!profiles){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back')
    }
    res.render('dashboard', {profiles})
}