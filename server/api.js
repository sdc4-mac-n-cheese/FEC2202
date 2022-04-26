require('dotenv').config();
const axios = require('axios');

module.exports = {
  getDataP: function (category) {
    let options = {
      url: `http://localhost:3000/${category}`,
      headers: {
        'AUTHORIZATION': process.env.API_KEY,
      }
    }

    return axios.get(options.url, options);
  },
  getData: function (category) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/${category}`,
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
  },

  putData: function (category, body) {
    let options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/rfp/${category}`,
      headers: {
        'AUTHORIZATION': process.env.API_KEY,
      }
    }

    return axios.put(options.url, body, options);
  }
}