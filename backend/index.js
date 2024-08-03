const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  express.json();
  next();
});

const port = process.env.PORT || 7998;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });