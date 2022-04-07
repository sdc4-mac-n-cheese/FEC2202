require('dotenv').config();
const express = require('express');
const path = require('path');
// const router = require('./router');
const api = require('./api');

const app = express();

// const PORT = 3000;
app.use(express.json());
// app.use('/api', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

//***** PRODUCTS */
//route to get all product data
//fixed a bug of sending response.data instead of response
app.get('/products', (req, res) => {
  api.getData('products')
    .then(response => {
     // console.log(response);
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.log('in get catch');
      res.setStatus(500).send(err);
    })
});

//route to get single product data
//ss noticed if we used endpoint '/products' we will always getting the fullist
//of all products
app.get('/product', (req, res) => {
  // console.log('here', req.query)
  api.getData(`products/${req.query.product_id}`)
    .then(response => {
   //   console.log(response);
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to get single product style data
app.get('/productStyle', (req, res) => {
  api.getData(`products/${req.query.product_id}/styles`)
    .then(response => {
    //  console.log(response);
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to get product's related products
app.get('/relatedProduct', (req, res) => {
  console.log("req.query>>>>>",req.query)
  api.getData(`products/${req.query.product_id}/related`)
    .then(response => {
      // console.log(response);
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});


///////////////////////////////////////////////////
///////////////////////////////////////////////////
//***** REVIEWS */
//route to post reviews
//POST A REVIEW
app.post('/reviews', (req, res) => {
  let request = req.body;
  //send in FO object with data below and send var
  let parameters = {
    product_id: request.product_id,
    rating: request.rating,
    summary: request.summary,
    body: request.body,
    recommend: request.recommend, //boolean
    name: request.name,
    email: request.email,
    photos: request.photos, //array of text
    characteristics: request.characteristics //object
  }

  api.postData('reviews', parameters)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to get product review's meta data
//GET REVIEWS/META
app.get('/reviews/meta', (req, res) => {
  // (req.queconsole.logry.product_id);
  api.getData(`reviews/meta?product_id=${req.query.product_id}`)
    .then(response => {
      // console.log("shanshan meta reviews", response.data,'end data');
      res.status(200).send(response.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//get review list...by a page/count/sort/product_id
app.get('/reviews', (req, res) => {
  let parameters = {
    page: req.query.page || 1,
    count: req.query.count || 5,
    sort: req.query.sort,
    product_id: req.query.product_id
  }
  api.getData(`reviews?page=${parameters.page}&count=${parameters.count}&sort=${parameters.sort}&product_id=${parameters.product_id}`)
    .then((result) => {
      // console.log(result.data.results);
      res.status(200).send(result.data.results);
    })
    .catch((err) => {
      // console.log('error in get list of reviews', err);
      res.status(500).send('could not get');
    })
})

//Update the helpful ratings
//PUT HELPFUL REVIEW

//review_id=1136196
app.put('/reviews/helpful', (req, res) => {
  // console.log('in review id:')
  // console.log(req.body.review_id);
  api.putData(`reviews/${req.body.review_id}/helpful`)
    .then((result) => {
      // console.log('data: ',result.data);
      res.status(204).send('updated helpful review brah');
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send('bad send');
    })
})

app.put('/reviews/report', (req, res) => {
  // console.log('in report');
  // console.log(req.body.review_id);
  api.putData(`reviews/${req.body.review_id}/report`)
    .then((result) => {
      // console.log(result);
      res.status(204).send('review reported brah');
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send('bad send');
    })
})
///////////////////////////////////////////////////
///////////////////////////////////////////////////

//***** Q&A */
app.get('/getQuestions', (req, res) => {
  api.getData(`qa/questions?product_id=${req.query.product_id}&page=${req.query.page}&count=${req.query.count}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

app.get('/getAnswers', (req, res) => {
  // console.log('HERE>>>>', req.query)
  api.getData(`qa/questions/${req.query.question_id}/answers?page=${req.query.page}&count=${req.query.count}`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

app.post('/addQuestion', (req, res) => {

  let parameters = {
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    product_id: req.body.product_id
  };

  api.postData('qa/questions', parameters)
    .then((response) => {
      res.send(response.data)
      // console.log(response);
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

app.post('/addAnswer', (req, res) => {

  console.log('fired!!')
  let parameters = {

    // product_id: req.body.product_id,
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
    photos: req.body.photos
  };
  // needs work!!!
  // ${req.query.question_id}/answers?body=${req.body.body}&name=${req.body.name}&email=${req.body.email}&photos=${req.body.photos}`
  // ?question_id=${req.query.question_id}`
  api.postData(`qa/questions/${req.query.question_id}/answers`, parameters)
    .then((response) => {
      res.status(201).send(response.data)
    })
    .catch((err) => {
      console.log('params', parameters)
      console.log('here>>>>>', req.query.question_id)
      res.status(500).send(err)
    })
});

app.put('/helpfulQuestion', (req, res) => {
  // console.log('HERERERE', req.query)
  api.putData(`qa/questions/${req.query.question_id}/helpful`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

app.put('/reportQuestion', (req, res) => {
  api.putData(`qa/questions/${req.query.question_id}/report`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

app.put('/helpfulAnswer', (req, res) => {
  api.putData(`qa/answers/${req.query.answer_id}/helpful`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

app.put('/reportAnswer', (req, res) => {
  api.putData(`qa/answers/${req.query.answer_id}/report`)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

//***** CART */
//route to retrieve list of products added to the cart by a user
app.get('/cart', (req, res) => {
  api.getData('cart')
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to add a product to the cart
app.post('/cart', (req, res) => {
  api.postData('cart')
    .then(response => {
      res.status(201).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to have interaction
app.post('/interaction', (req, res) => {
  //console.log("req.body>>>>>>",req.body)
  api.postData('interactions', req.body)
    .then(response => {
     // console.log(response.data)
      res.status(201).send(response.data);
    })
    .catch(err => {
    //  console.log(err)
      res.status(500).send(err);
    })
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('NOT connected');
  } else {
    console.log(`connected to ${process.env.PORT}`);
  }
});
