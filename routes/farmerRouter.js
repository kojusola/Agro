const router = require("express").Router()
const { getFarmers } = require("../controllers/farmerController")
const {isLoggedIn, restrictTo} = require("../middleware/authorization")


router.route('/').get(isLoggedIn, getFarmers)

module.exports = router;