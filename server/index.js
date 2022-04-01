require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./router');
const api = require('./api');

const app = express();

// const PORT = 3000;
app.use(express.json());
app.use('/api', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

//route to get all product data
app.get('/products', (req, res) => {
  console.log('query', req.query);
  api.getData(req.query)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    })
});

//route to post reviews
app.post('/reviews', (req, res) => {
  let request = req.body;
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
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('NOT connected');
  } else {
    console.log(`connected to ${process.env.PORT}`);
  }
});
