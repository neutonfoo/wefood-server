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
  const pollId = await PollManager.createNewPoll(
    poll_prompt,
    location,
    cuisine,
    cuisine_query,
    price_range_index,
    number_of_results,
    is_using_current_location
  );
  res.json({ pollId: pollId });
};

exports.get_poll = function (req, res) {
  const pollId = req.params.pollId;
  res.json(PollManager.getPoll(pollId));
};

exports.vote_poll = function (req, res) {
  const pollId = req.params.pollId;
  const business_id = req.body.business_id;
  res.json(PollManager.votePoll(pollId, business_id));
};

exports.delete_poll = function (req, res) {
  const pollId = req.params.pollId;
  res.json(PollManager.deletePoll(pollId));
};

exports.get_polls = function (req, res) {
  res.json(PollManager.getPolls());
};
