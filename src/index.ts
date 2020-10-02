import express = require('express');
import dotenv = require('dotenv');
dotenv.config();

const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
