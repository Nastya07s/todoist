import express from 'express';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

import { UserModel } from '../models';

module.exports.login = async function (
  req: express.Request,
  res: express.Response
) {
  const candidate: any = await UserModel.findOne({ login: req.body.login });

  if (candidate) {
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

      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401).json({
        message: 'Password entered incorrectly',
      });
    }
  } else {
    res.status(404).json({
      message: 'This user does not exist',
    });
  }
};

module.exports.register = async function (
  req: express.Request,
  res: express.Response
) {
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
};
