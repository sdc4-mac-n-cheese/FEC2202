const axios = require('axios');
const api = require('./api');

const controllers = {
  products: {
    getProducts: (req, res) => {
      // console.log('query', req.query);
      api.getData(req)
        .then(response => {
          console.log(response);
          res.status(200).send(response);
        })
        .catch(err => {
          res.status(500).send(err);
        })
    }
  },
  reviews: {

  },
  qa: {

  },
  cart: {

  },
  interactions: {

  }
}

module.exports = controllers;