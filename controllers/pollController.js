const PollManager = require("../models/PollManager");

exports.create_poll = async function (req, res) {
  const poll_prompt = req.body.poll_prompt;
  const location = req.body.location;
  const cuisine = req.body.cuisine;
  const cuisine_query = req.body.cuisine_query;
  const price_range_index = req.body.price_range_index + 1;
  const number_of_results = req.body.number_of_results;
  const is_using_current_location = req.body.is_using_current_location;

  // Generate Poll and Poll ID
  const poll_id = await PollManager.createNewPoll(
    poll_prompt,
    location,
    cuisine,
    cuisine_query,
    price_range_index,
    number_of_results,
    is_using_current_location
  );
  res.json({ poll_id: poll_id });
};

exports.get_poll = function (req, res) {
  const poll_id = req.params.poll_id;
  res.json(PollManager.getPoll(poll_id));
};

exports.vote_poll = function (req, res) {
  const poll_id = req.params.poll_id;
  const business_id = req.body.business_id;
  res.json(PollManager.votePoll(poll_id, business_id));
};

exports.get_polls = function (req, res) {
  res.json(PollManager.getPolls());
};
