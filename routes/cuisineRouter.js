var express = require("express");
var router = express.Router();

// # Controllers
const cuisine_controller = require("../controllers/cuisineController");

// Get Cuisines
router.get("/", cuisine_controller.get_cuisines);

module.exports = router;
