if (process.env.NODE_ENV !== "production") require("dotenv").config();

const axios = require("axios");

const yelpBase = "https://api.yelp.com/v3";

const instance = axios.create({
  baseURL: yelpBase,
  timeout: 5000,
  headers: { Authorization: `Bearer ${process.env.YELP_API}` },
});

module.exports.getBusinesses = async (term, location, price_range) => {
  return await instance.get("/businesses/search", {
    params: {
      term: term,
      location: location,
      price: price_range,
    },
  });
};
