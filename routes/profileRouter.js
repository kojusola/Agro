const router = require("express").Router()
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const { updateProfile, updateProfileImage,getAllFarmerProfile, getOneProfile,getAllProfile} = require("../controllers/profileController");
const {isLoggedIn, restrictTo} = require("../middleware/authorization")


router.route('/').get(getAllFarmerProfile);
router.route('/all').get(getAllProfile);
router.route('/:id').get(getOneProfile).patch(updateProfile);
router.route('/:id/pimage').patch(upload.single('image'),updateProfileImage);


module.exports = router;