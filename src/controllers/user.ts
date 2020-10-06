import express from 'express';
const controller = require('./auth');

class UserController {
  static create(req: express.Request, res: express.Response) {}
  static get(req: express.Request, res: express.Response) {
    // if (req.query.code) {

    // }
    // console.log('req: ', req.user);
    // controller.login();
    // console.log('5645665');
    // const login = req && req.user && req.user['login'];
    // console.log('login: ', login);
    // const user: any = req.user;
    // res.send(JSON.stringify(user.login));
  }
}

export default UserController;
