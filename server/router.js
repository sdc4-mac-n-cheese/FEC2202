const router = require('express').Router();
const controllers = require('./controllers');

//Products
router
  .route('/product')
  .get(controllers.products.getProducts());

//Reviews
router
  .route('/reviews')
  .get()
  .post()
  .put();

//Q&A
router
  .route('/qa')
  .get()
  .post()
  .put();

//Cart
router
  .route('/cart')
  .get()
  .post();


//Interactions
router
  .route('/interactions')
  .post();

module.exports = router;