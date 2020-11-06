const { getBusinesses } = require("../util/yelpUtil");

module.exports = class Poll {
  constructor(poll_id, term, location, numberOfResults) {
    this.poll_id = poll_id;
    this.term = term;
    this.location = location;
    this.numberOfResults = numberOfResults;

    this.businessesMap = {};
  }

  async populateBusinesses() {
    await getBusinesses(this.term, this.location)
      .then(response => {
        // Filter top 5 businesses
        this.businesses = response.data.businesses
          .slice(0, this.numberOfResults)
          .map((business, business_index) => {
            this.businessesMap[business.id] = business_index;

            return {
              id: business.id,
              name: business.name,
              url: business.url,
              image_url: business.image_url,
              votes: 0,
            };
          });
      })
      .catch(err => console.log(err));
  }

  vote(business_id) {
    this.businesses[this.businessesMap[business_id]].votes++;
  }
};
