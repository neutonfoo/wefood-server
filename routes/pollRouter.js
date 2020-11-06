var express = require("express");
var router = express.Router();

// # Controllers
const poll_controller = require("../controllers/pollController");

// # Poll Routes (/api/poll)

// Get All Polls
router.get("/", poll_controller.poll_list);

// Get a Poll by Poll ID
router.get("/:poll_id", poll_controller.get_poll);

// Get a Poll by Poll ID
router.put("/:poll_id", poll_controller.vote_poll);

// Create a new poll
router.post("/", poll_controller.create_poll);

module.exports = router;
