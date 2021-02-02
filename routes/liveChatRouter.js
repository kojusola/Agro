const router = require('express').Router()
const { livechat } = require('../controllers/liveChatController')
const {isLoggedIn, restrictTo} = require("../middleware/authorization")

router.route('/').get(isLoggedIn, livechat)

module.exports = router;