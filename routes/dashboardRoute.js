const router = require("express").Router();
const { profile } = require("../controllers/dashboardController")

router.get('/', profile)


module.exports = router;