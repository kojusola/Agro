const router = require("express").Router()
const { login, userSignupForm, userLoginForm, signup, logout } = require("../controllers/authController")


router.route('/login').get(userLoginForm).post(login)
router.route('/signup').get(userSignupForm).post(signup)
router.route('/logout').get(logout)

// router.route('/login').post(login)
// router.route('/signup').post(signup)
// router.route('/logout').get(logout)

module.exports = router;