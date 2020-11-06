const cuisines = require("../data/cuisines.json");

exports.get_cuisines = function (req, res) {
  res.send(cuisines);
};
