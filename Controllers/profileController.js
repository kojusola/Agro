const User = require("../models/user");
const Profile = require("../models/profile");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");


exports.getOneProfile= async(req, res) =>{
    // const userProfile = await Profile.findById({user_id: req.params.id});
    // if(!userProfile){
    //     req.flash('error', 'Something went wrong. Try again')
    //     return res.redirect('back');
    // }
   return res.render('userSetting.hbs')
}



exports.getAllProfile= async(req, res) =>{
    const allUsersProfile = await Profile.find();
    if(!allUsersProfile){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back')
    }
    res.status(200).json({
        status: "success",
        data:{
            allUsersProfile
        }
    })
}

exports.getAllFarmerProfile= async(req, res) =>{
    const usersProfile = await Profile.find({role:'farmer',status: 'verified'});
    if(!usersProfile){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back')
    }
    res.status(200).json({
        status: "success",
        data:{
            usersProfile
        }
    })
}
// // create profile

exports.createProfile =  async(req, res)=>{
    console.log(req.body)
    const Profile = new Profile({
        user_id: req.user._id,
        name: req.user.name,
        email: req.user.username,
        role: req.user.role,
        birthday: req.body.birthday,
        address: req.body.address,
        country: req.body.country,
        phone: req.body.phone,
        interests:req.body.interests     
    })
    console.log(profile)
    await Profile.save();
    req.flash('success', 'Profile updated successfully')
    res.redirect(`/profile/${user_id}`);
};

// // It can be used to update profile and also change users profile from pending to verified
exports.updateProfile =  async(req, res)=>{
    const updatedProfile = await Profile.findByIdAndUpdate({user_id: req.params.id}, req.body, {new: true});
    if(!updatedProfile){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back')
    }
    req.flash('success', 'Profile updated successfully')
    res.redirect(`/profile/${user_id}`);
};

exports.updateProfileImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path); 
        const updateProfile = await Profile.findByIdAndUpdate({user_id: req.params.id}, {profileimage: {avatar:result.secure_url,cloundinary_id: result.public_id}}, {new: true})
        if(!updateProfile){
            req.flash('error', 'Something went wrong. Try again')
            return res.redirect('back')
        }
        req.flash('success', 'Profile image updated successfully')
        res.redirect(`/profile/${user_id}`);
        // return res.json({
        //     updateProfile
        // })
}

// posting images of the farm
exports.updateFarmImage = async (req, res) => {
    const files = req.files
    for(const file of files){
        const result = await cloudinary.uploader.upload(req.file.path);
        const updateProfile = await Profile.findByIdAndUpdate({user_id: req.params.id}, {$push: {farmimage: {avatar:result.secure_url,cloundinary_id: result.public_id}}}, {new: true})
        if(!updateProfile){
            req.flash('error', 'Something went wrong. Try again')
            return res.redirect('back')
        }
        req.flash('success', 'Profile image updated successfully')
        res.redirect(`/profile/${user_id}`);
    }
        // return res.json({
        //     updateProfile
        // })
}