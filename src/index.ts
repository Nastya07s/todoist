import express = require('express');
import dotenv = require('dotenv');
import bodyParser = require('body-parser');

// import { UserModel } from './models';
import { commentRoutes, projectRoutes, taskRoutes } from './routes';

const mongoose = require('mongoose');

dotenv.config();

const app: express.Application = express();

mongoose.connect('mongodb://localhost:27017/todoist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(bodyParser.json());
app.use(function logMethodAndUrl(request, response, next) {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/comment', commentRoutes);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
