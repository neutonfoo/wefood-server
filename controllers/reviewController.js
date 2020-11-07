const { getBusinessReviews } = require("../util/yelpUtil");

exports.get_review = function (req, res) {
  const business_id = req.params.business_id;
  getBusinessReviews(business_id).then(response => {
    res.json(response.data);
  });
};
