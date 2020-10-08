import express from 'express';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

import { UserModel } from '../models';

class AuthController {
  static async login(req: express.Request, res: express.Response) {
    const candidates: any = await UserModel.find({ login: req.body.login });

    if (!candidates.length)
      return res.status(404).json({
        message: 'This user does not exist',
      });

    let tokenForEnter = '';
    candidates.forEach((candidate: any) => {
      const passResult = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );
      if (passResult) {
        const token = jwt.sign(
          {
            login: candidate.login,
            userId: candidate._id,
          },
          keys.jwt,
          { expiresIn: 60 * 60 }
        );
        tokenForEnter = `Bearer ${token}`;

        return;
      }
    });

    if (tokenForEnter)
      return res.status(200).json({
        token: tokenForEnter,
      });

    res.status(401).json({
      message: 'Password entered incorrectly',
    });
  }

  static async register(req: express.Request, res: express.Response) {
    const candidate = await UserModel.findOne({ email: req.body.email });

    if (candidate) {
      res.status(409).json({
        message: 'This email is already taken',
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const password = req.body.password;
      const user = new UserModel({
        login: req.body.login,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
      });

      try {
        await user.save();
        res.status(201).send({ message: 'User created' });
      } catch (e) {
        res.status(409).json({ message: e.message });
        // errorHandler(res, e);
      }
    }
  }

  static async loginGoogle(req: express.Request, res: express.Response) {
    const user: any = req.user;
    const token = jwt.sign(
      {
        login: user.login,
        userId: user._id,
      },
      keys.jwt,
      { expiresIn: 60 * 60 }
    );

    res.status(200).json({
      token: `Bearer ${token}`,
    });
  }
}

export default AuthController;
