const router = require("express").Router();
const { landPage} = require("../controllers/landingPageController")

router.get('/', landPage)


module.exports = router;