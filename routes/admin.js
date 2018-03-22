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
router.get("/showEvents",admin_controller.events);
router.get("/showZakirs",admin_controller.zakir);
router.get("/showZakirnew",admin_controller.zakir_new);
router.get("/download_ca",admin_controller.download_ca);
router.get("/download_teamLeader",admin_controller.download_teamLeader);
router.post("/download_teams",admin_controller.download_teams);
router.post("/download_events",admin_controller.download_events);
router.get("/download_zakir",admin_controller.download_zakir);
router.get("/download_zakir_new",admin_controller.download_zakir_new);
router.post("/send_mail",admin_controller.send_mail);
module.exports = router;