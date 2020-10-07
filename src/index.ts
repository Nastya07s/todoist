import express = require('express');
import dotenv = require('dotenv');
import bodyParser = require('body-parser');

const https = require('https');
const http = require('http');
const fs = require('fs');

import {
  authRouter,
  commentRouter,
  projectRouter,
  searchRouter,
  taskRouter,
} from './routers';

const keys = require('./config/keys');
const passport = require('passport');
const mongoose = require('mongoose');

dotenv.config();

const app: express.Application = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
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
    return res.redirect(307, req.hostname + ':' + port + req.url);
  }
  next();
});

app.use('/api/project', projectRouter);
app.use('/api/task', taskRouter);
app.use('/api/comment', commentRouter);
app.use('/api/auth', authRouter);
app.use('/api/search', searchRouter);

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

http.createServer(app).listen(portHttp);

https.createServer(options, app).listen(port, function () {
  console.log(`App is listening on port ${port}!`);
});
