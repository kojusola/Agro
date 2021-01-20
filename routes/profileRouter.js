const router = require("express").Router()
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const { updateProfile, updateProfileImage,getAllFarmerProfile,createProfile, getOneProfile,getAllProfile} = require("../controllers/profileController");
const {isLoggedIn, restrictTo} = require("../middleware/authorization")


router.route('/').get(getAllFarmerProfile);
router.route('/all').get(getAllProfile);
router.route('/:id').get(getOneProfile).post(createProfile).patch(updateProfile);
router.route('/:id/pimage').post(upload.single('image'),updateProfileImage);
router.route('/:id/fimage').post(upload.array('image'),updateProfileImage);


module.exports = router;