const user = require("../models/user");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");


exports.getOneProfile= async(req, res) =>{
    const userProfile = await user.findById({_id: req.params});
    if(!userProfile){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back')
    }
    res.status(200).json({
        status: "success",
        data:{
            userProfile
        }
    })
}

exports.getAllProfile= async(req, res) =>{
    const allUsersProfile = await user.find();
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
    const usersProfile = await user.find({role:'farmer',status: 'verified'});
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
// It can be used to update profile and also change users profile from pending to verified
exports.updateProfile =  async(req, res)=>{
    const updatedProfile = await user.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
    if(!updatedProfile){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back')
    }
    req.flash('success', 'Profile updated successfully')
    res.redirect('/profile/:id')
};

exports.updateProfileImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
        const updateProfile = await user.findByIdAndUpdate(req.params.id, {profileimage: {avatar:result.secure_url,cloundinary_id: result.public_id}}, {new: true})
        if(!updateProfile){
            req.flash('error', 'Something went wrong. Try again')
            return res.redirect('back')
        }
        req.flash('success', 'Profile image updated successfully')
        res.redirect('/profile/:id')  
        // return res.json({
        //     updateProfile
        // })
}