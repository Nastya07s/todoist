import express = require('express');
import dotenv = require('dotenv');
import bodyParser = require('body-parser');

// import { UserModel } from './models';
import { authRoutes, commentRoutes, projectRoutes, taskRoutes } from './routes';
const keys = require('./config/keys');
const passport = require('passport');

const mongoose = require('mongoose');

dotenv.config();

const app: express.Application = express();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (
  user: any,
  done: (arg0: null, arg1: any) => void
) {
  done(null, user);
});

passport.deserializeUser(function (
  user: any,
  done: (arg0: null, arg1: any) => void
) {
  done(null, user);
});
require('./middleware/passport')(passport);

app.use(bodyParser.json());
app.use(function logMethodAndUrl(request, response, next) {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
