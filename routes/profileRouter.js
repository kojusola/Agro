const router = require("express").Router()
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const { updateProfile, updateProfileImage,createMessage, retriveOneProfile,createProfile, getOneProfile,profileForm} = require("../controllers/profileController");
const {isLoggedIn} = require("../middleware/authorization")


router.route('/').get(isLoggedIn, profileForm).post(isLoggedIn, createProfile);
router.route('/:id').get(isLoggedIn,getOneProfile).patch(isLoggedIn,updateProfile);
router.route('/:id/retrieve').get(isLoggedIn,retriveOneProfile)
router.route('/:id/message').post(isLoggedIn, createMessage)
router.route('/:id/pimage').post(isLoggedIn,updateProfileImage);
// router.route('/:id/fimage').post(upload.array('image'),updateProfileImage);



module.exports = router;