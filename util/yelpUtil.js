if (process.env.NODE_ENV !== "production") require("dotenv").config();

const axios = require("axios");

const yelpBase = "https://api.yelp.com/v3";

const instance = axios.create({
  baseURL: yelpBase,
  timeout: 5000,
  headers: { Authorization: `Bearer ${process.env.YELP_API}` },
});

module.exports.getBusinesses = async (term, location, price_range) => {
  // is_using_current_location automatically handled by Yelp API

  return await instance.get("/businesses/search", {
    params: {
      term: term,
      location: location,
      price: price_range,
    },
  });
};

module.exports.getBusinessReviews = async business_id => {
  return await instance.get(`/businesses/${business_id}/reviews`);
};
