const router = require('express').Router();
const controllers = require('./controllers');

//Products
router
  .route('/products')
  .get(controllers.products.getProducts)

router
  .route('/product')
  .get(controllers.products.getProduct)
//Reviews
router
  .route('/reviews')
  .get(controllers.reviews.getReviews)
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