var express = require('express');
var router = express.Router();

var home_controller = require('../controllers/homeController');

router.get("/",home_controller.index);
// router.get("/home_two",home_controller.home_two);
// router.get("/home_three",home_controller.home_three);
router.get("/register",home_controller.register);
router.get("/login",home_controller.login);
router.get("/logout",home_controller.logout);
router.get("/campus_ambassador",home_controller.campus_ambassador);
// router.get("/live",home_controller.live);
router.get("/register_teams",home_controller.register_teams);
router.post("/register_teams",home_controller.post_register_teams);
router.get("/register_sports",home_controller.register_sports);
router.get("/forgot_password",home_controller.forgot_password);
router.get("/send_token",home_controller.send_token);
router.get("/reset_password/:token",home_controller.reset_password);
router.get("/thankyou",home_controller.thankyou);
router.get("/thankyou_ca",home_controller.thankyou_ca);
router.post("/reset_password",home_controller.post_reset_password);
router.post("/register_sports",home_controller.post_register_sports);
router.post("/campus_ambassador",home_controller.post_campus_ambassador);
router.post("/register",home_controller.post_register);
router.post("/login",home_controller.post_login);
router.post("/send_token",home_controller.post_send_token);
router.get("/my_teams",home_controller.my_teams);
router.post("/contingent_submit",home_controller.contingent_submit);
router.get("/register_events",home_controller.get_register_events);
router.post("/register_events",home_controller.register_events);
router.post("/register_events_teams",home_controller.register_events_teams);
// router.get("/img", home_controller.carousel);


module.exports = router;