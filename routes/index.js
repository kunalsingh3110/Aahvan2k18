var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/homeController');

router.get("/",home_controller.index);
router.get("/register",home_controller.register);
router.get("/campus_ambassador",home_controller.campus_ambassador);
router.get("/live",home_controller.live);
router.post("/campus_ambassador",home_controller.post_campus_ambassador);


module.exports = router;