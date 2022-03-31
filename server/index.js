require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// creating variables to make minimal api requests.
// const questions =
// const related =
// const ratings =
// const detail =

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('NOT connected');
  } else {
    console.log(`connected to ${PORT}`);
  }
});
