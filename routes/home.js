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
router.get("/forgot_password",home_controller.forgot_password);
router.get("/send_token",home_controller.send_token);
router.get("/reset_password/:token",home_controller.reset_password);
router.post("/reset_password",home_controller.post_reset_password);
router.post("/register_sports",home_controller.post_register_sports);
router.post("/campus_ambassador",home_controller.post_campus_ambassador);
router.post("/register",home_controller.post_register);
router.post("/login",home_controller.post_login);
router.post("/send_token",home_controller.post_send_token);



module.exports = router;