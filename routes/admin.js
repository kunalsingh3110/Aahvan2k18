var express = require('express');
var router = express.Router();

var admin_controller = require("../controllers/adminController");

router.get("/",admin_controller.index);
router.post("/",admin_controller.post_index);
router.get("/details",admin_controller.details);
router.get("/logout",admin_controller.logout);
router.get("/showTeams",admin_controller.teams);
router.get("/showSports",admin_controller.sports);
router.post("/showScores",admin_controller.scores);
router.get("/showCA",admin_controller.ca);
router.get("/showTeamLeaders",admin_controller.team_leaders);
router.post("/change_tag_ca",admin_controller.change_tag_ca);
router.post("/change_tag_teamLeader",admin_controller.change_tag_teamLeader);
router.post("/change_tag_team",admin_controller.change_tag_team);

module.exports = router;