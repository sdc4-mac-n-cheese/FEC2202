const api = require('./api.js');

const controllers = {

  products: {

    getProducts: ((req, res) => {
      console.log('query', req.query);
      api.getData('products')
        .then(response => {
          // console.log(response);
          res.status(200).send(response.data);
        })
        .catch(err => {
          res.status(500).send(err);
        })
    }),

    getProduct: ((req, res) => {
      // console.log(req.query.product_id)
      api.getProduct(req.query.product_id)
      .then((response) => {
        res.status(200).send(response.data)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
    })
  },

  reviews: {

    getReviews: ((req, res) => {

      api.getData('reviews')
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(500).send(err);
        })
    })

  },

  qa: {

  },

  cart: {

  },

  interactions: {

  }
}

module.exports = controllers;