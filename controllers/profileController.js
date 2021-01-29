const User = require("../models/user");
const Profile = require("../models/profile");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const generator = require('generate-password');
const dateFormat = require("dateformat");

exports.profileForm = async(req, res) => {
    res.render('profileForm.hbs')
}

exports.getOneProfile= async(req, res) =>{
    const userProfile = await Profile.findOne({user_id: req.params.id});
    if(userProfile.length == 0){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back');
    }
    return res.render('userSetting.hbs', {profile: userProfile})
}

exports.retriveOneProfile= async(req, res) =>{
    const userProfile = await Profile.findOne({user_id: req.params.id});
    if(userProfile.length == 0){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back');
    }
    return res.status(200).json({
        "status":"success",
        "data":{
            userProfile
        }
    })
}






exports.createMessage = async(req, res, next) => {
    const mapper = [{"identity": req.params.id}, {"identity": req.user._id}]
    const randomNumber = generator.generate({
        length: 15,
        numbers: true,
    });
    const message = {
        sender: req.user.username,
        receiver: req.body.email,
        message: req.body.message,
        node: randomNumber,
        date: dateFormat(Date.now(), 'fullDate')
    }
    let promises = mapper.map(async entry => {
        const profile = await Profile.findOne({user_id: entry.identity})
        profile.messages.push(message)
        profile.save()
    })
    Promise.all(promises).then(async(data) => {
        return res.status(200).json({
            "status":"success",
            "message":"Message sent successfully!"
        })
    })
    .catch(err=>{
        console.log(err)
    })
}




// =================================================================================
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
// ==================================================================================================
// // create profile

exports.createProfile =  async(req, res)=>{
    // const result = await cloudinary.uploader.upload(req.body.profileimage.file.path);
    const prof = await Profile.create({
        user_id: req.user._id,
        email: req.user.username,
        role: req.user.role,
        profileimage: null
        // {avatar:result.secure_url,cloundinary_id: result.public_id}
        ,
        birthday: req.body.birthday,
        state: req.body.state,
        phoneNumber: req.body.phonenumber,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        languages:req.body.languages,
        landnumber:req.body.landnumber,
        majorproduce:req.body.majorproduce,
        yrexperience:req.body.yrexperience,
        aboutyou:req.body.aboutyou
    })
    if(req.user.role == 'investor'){
        req.flash('success', 'Profile updated successfully')
        res.redirect(`/`);

    }else{
        req.flash('success', 'Profile updated successfully')
        res.redirect(`/profile/${prof.user_id}`);
    }
    
};

// // It can be used to update profile and also change users profile from pending to verified
exports.updateProfile =  async(req, res)=>{
    const updatedProfile = await Profile.findOneAndUpdate({user_id: req.params.id}, req.body, {new: true});
    if(!updatedProfile){
        req.flash('error', 'Something went wrong. Try again')
        return res.redirect('back')
    }
    req.flash('success', 'Profile updated successfully')
    res.redirect(`/profile/${updatedProfile.user_id}`);
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
}