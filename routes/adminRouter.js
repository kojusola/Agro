const router = require("express").Router()
const {verifyProfile, getAllProfile, deleteProfile } = require("./../controllers/adminController")
const {isLoggedIn, restrictTo} = require("../middleware/authorization")


router.route('/').get(isLoggedIn, restrictTo("admin"), getAllProfile);
router.route('/profile/:id').get(isLoggedIn, restrictTo("admin"), verifyProfile).delete(isLoggedIn, restrictTo("admin"), deleteProfile);

module.exports = router