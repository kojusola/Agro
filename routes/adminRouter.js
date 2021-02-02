const router = require("express").Router()
const { admin, getAllProfile } = require("./../controllers/adminController")
const {isLoggedIn, restrictTo} = require("../middleware/authorization")


router.route('/').get(isLoggedIn, restrictTo('admin'),getAllProfile);

module.exports = router