var express = require("express");
var router = express.Router();

// # Controllers
const poll_controller = require("../controllers/pollController");

// # Poll Routes (/api/poll)

// Get All Polls
router.get("/", poll_controller.get_polls);

// Get a Poll by Poll ID
router.get("/:pollId", poll_controller.get_poll);

// Get a Poll by Poll ID
router.put("/:pollId", poll_controller.vote_poll);

// Create a new poll
router.post("/", poll_controller.create_poll);

// Delete a poll
router.delete("/:pollId", poll_controller.delete_poll);

module.exports = router;
