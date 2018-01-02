var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/homeController');

router.get("/",home_controller.index);
router.get("/register",home_controller.register);
router.get("/login",home_controller.login);
router.get("/logout",home_controller.logout);
router.get("/campus_ambassador",home_controller.campus_ambassador);
router.get("/live",home_controller.live);
router.get("/register_teams",home_controller.register_teams);
router.post("/register_teams",home_controller.post_register_teams);
router.get("/register_sports",home_controller.register_sports);
router.post("/register_sports",home_controller.post_register_sports);
router.post("/campus_ambassador",home_controller.post_campus_ambassador);
router.post("/register",home_controller.post_register);
router.post("/login",home_controller.post_login);


module.exports = router;