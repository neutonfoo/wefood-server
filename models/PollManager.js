const Poll = require("./Poll");

class PollManager {
  constructor() {
    // Polls is a dictionary that maps pollId => Poll
    this.polls = {};

    this.minCode = 1000;
    this.maxCode = 9999;
  }

  generatePollId() {
    // Generate random, unused code
    let pollId;
    do {
      pollId = Math.floor(
        Math.random() * (this.maxCode - this.minCode) + this.minCode
      );
    } while (pollId in this.polls);

    return pollId;
  }

  async createNewPoll(
    poll_prompt,
    location,
    cuisine,
    cuisine_query,
    price_range_index,
    number_of_results,
    is_using_current_location
  ) {
    const pollId = this.generatePollId(1000, 9999);

    this.polls[pollId] = new Poll(
      pollId,
      poll_prompt,
      location,
      cuisine,
      cuisine_query,
      price_range_index,
      number_of_results,
      is_using_current_location
    );
    await this.polls[pollId].populateBusinesses();

    return pollId;
  }

  getPoll(pollId) {
    if (pollId in this.polls) {
      return this.polls[pollId];
    }

    return { error: "Poll does not exist." };
  }

  votePoll(pollId, business_id) {
    this.polls[pollId].vote(business_id);
    return { success: "Voted on poll." };
  }

  deletePoll(pollId) {
    delete this.polls[pollId];
    return { success: "Delete poll." };
  }

  getPolls() {
    return Object.entries(this.polls);
  }
}

module.exports = new PollManager();
