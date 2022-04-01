require('dotenv').config();
const axios = require('axios');

const api = {

  getData: function (category) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/${category}`,
      headers: {
        'AUTHORIZATION': process.env.API_KEY,
      }
    }
    return axios.get(options.url, options);
  },

  getProduct: function (id) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/products/${id}`,
      headers: {
        'AUTHORIZATION': process.env.API_KEY,
      }
    }
    return axios.get(options.url, options);
  },

  postData: function (category, body) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/${category}`,
      headers: {
        'AUTHORIZATION': process.env.API_KEY,
      }
    }

    return axios.post(options.url, body, options);
  }
}

module.exports = api;