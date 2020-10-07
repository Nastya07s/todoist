import express = require('express');
import dotenv = require('dotenv');
import bodyParser = require('body-parser');

const https = require('https');
const http = require('http');
const fs = require('fs');

// import { UserModel } from './models';
import {
  authRoutes,
  commentRoutes,
  projectRoutes,
  taskRoutes,
  userRoutes,
} from './routes';
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
require('./middleware/passport')(passport);

app.use(bodyParser.json());
app.use(function logMethodAndUrl(request, response, next) {
  console.log(`${request.method} ${request.url}`);
  next();
});

const portHttp = process.env.PORT_HTTP || 3001;
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  if (!req.secure) {
    return res.redirect(307, 'https://localhost:' + port + req.url);
  }
  next();
});

app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

http.createServer(app).listen(portHttp);

https.createServer(options, app).listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
