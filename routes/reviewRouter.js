var express = require("express");
var router = express.Router();

// # Controllers
const review_controller = require("../controllers/reviewController");

// # Poll Routes (/api/review)

// Get a Poll by Poll ID
router.get("/:business_id", review_controller.get_review);

module.exports = router;
