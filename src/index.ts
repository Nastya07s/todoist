import express = require('express');
import dotenv = require('dotenv');

import { UserModel } from './models';

const mongoose = require('mongoose');

dotenv.config();

const app: express.Application = express();

mongoose.connect('mongodb://localhost:27017/todoist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.get('/', function (req, res) {
  UserModel.create(
    { login: 'nastya07s', email: 'test3@mail.ru', password: '123' },
    function (err, small) {
      if (err) return res.send(err);
      // saved!
      res.send('Hello World!');
    }
  );
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
