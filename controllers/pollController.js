const PollManager = require("../models/PollManager");

exports.create_poll = async function (req, res) {
  const term = req.body.term;
  const location = req.body.location;
  const numberOfResults = req.body.numberOfResults;

  // Generate Poll and Poll ID
  const poll_id = await PollManager.createNewPoll(
    term,
    location,
    numberOfResults
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

exports.poll_list = function (req, res) {
  res.json(PollManager.getAll());
};
