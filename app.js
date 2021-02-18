const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('common')); // let's see what 'common' format looks like
const books = require('./books-data.js');
app.use(cors());

app.get('/books', (req, res) => {
  const { search = "", sort } = req.query;

  // search for pattern in book title
  let results = books
    .filter(book =>
      book
        .title
        .toLowerCase()
        .includes(search.toLowerCase()));


  if (sort)
  {
    // is the sort term title or rank ? if both are not return 400 <<
    // include here is the same as compare if it's there.
    if (!['title', 'rank'].includes(sort))
    {
      return res
        .status(400)
        .send('Sort must be one of title or rank');
    }
  }

  // sort by title or rank 
  if (sort)
  {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res
    .json(results);
});


module.exports = app;

