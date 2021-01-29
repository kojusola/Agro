const router = require("express").Router()
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const { updateProfile, updateProfileImage,createMessage, retriveOneProfile, getAllFarmerProfile,createProfile, getOneProfile,getAllProfile,profileForm} = require("../controllers/profileController");
const {isLoggedIn, restrictTo} = require("../middleware/authorization")


router.route('/').get(profileForm).post(createProfile);
router.route('/all').get(getAllProfile);
router.route('/:id').get(getOneProfile).patch(updateProfile);
router.route('/:id/retrieve').get(retriveOneProfile)
router.route('/:id/message').post(createMessage)
router.route('/:id/pimage').post(upload.single('image'),updateProfileImage);
router.route('/:id/fimage').post(upload.array('image'),updateProfileImage);



module.exports = router;