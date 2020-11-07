const Poll = require("./Poll");

class PollManager {
  constructor() {
    // Polls is a dictionary that maps poll_id => Poll
    this.polls = {};

    this.minCode = 1000;
    this.maxCode = 9999;
  }

  generatePollId() {
    // Generate random, unused code
    let poll_id;
    do {
      poll_id = Math.floor(
        Math.random() * (this.maxCode - this.minCode) + this.minCode
      );
    } while (poll_id in this.polls);

    return poll_id;
  }

  async createNewPoll(term, location, numberOfResults = 5) {
    const poll_id = this.generatePollId(1000, 9999);

    this.polls[poll_id] = new Poll(poll_id, term, location, numberOfResults);
    await this.polls[poll_id].populateBusinesses();

    return poll_id;
  }

  getPoll(poll_id) {
    if (poll_id in this.polls) {
      return this.polls[poll_id];
    }

    return { error: "Poll does not exist." };
  }

  votePoll(poll_id, business_id) {
    this.polls[poll_id].vote(business_id);
    return { success: "Voted" };
  }

  getPolls() {
    return Object.entries(this.polls);
  }
}

module.exports = new PollManager();
