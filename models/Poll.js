const { getBusinesses } = require("../util/yelpUtil");

module.exports = class Poll {
  constructor(
    pollId,
    poll_prompt,
    location,
    cuisine,
    cuisine_query,
    price_range_index,
    number_of_results,
    is_using_current_location
  ) {
    this.pollId = pollId;
    this.date = new Date().toLocaleDateString();
    this.time = new Date().toLocaleTimeString();

    this.poll_prompt = poll_prompt;
    this.location = location;
    this.cuisine = cuisine;
    this.cuisine_query = cuisine_query;
    this.price_range_index = price_range_index;
    this.number_of_results = number_of_results;
    this.is_using_current_location = is_using_current_location;

    this.businesses = [];
    this.businessesMap = {};
  }

  async populateBusinesses() {
    await getBusinesses(
      this.cuisine_query,
      this.location,
      this.price_range_index,
      this.is_using_current_location
    )
      .then(response => {
        // Filter top 5 businesses
        this.businesses = response.data.businesses
          .slice(0, this.number_of_results)
          .map((business, business_index) => {
            this.businessesMap[business.id] = business_index;

            return {
              id: business.id,
              name: business.name,
              address: business.location.display_address,
              url: business.url,
              image_url: business.image_url,
              categories: business.categories.map(({ title }) => title),
              lat: business.coordinates.latitude,
              lng: business.coordinates.longitude,
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
