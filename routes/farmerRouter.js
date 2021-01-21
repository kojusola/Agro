const router = require("express").Router()
const { getFarmers } = require("../controllers/farmerController")


router.route('/').get(getFarmers)

module.exports = router;