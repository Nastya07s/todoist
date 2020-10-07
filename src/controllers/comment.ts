import express from 'express';
import { CommentModel, TaskModel } from '../models';

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class CommentController {
  static create(req: express.Request, res: express.Response) {
    let token = req.headers.authorization;
    if (token?.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    const { userId } = jwt.verify(token, keys.jwt);

    CommentModel.create({ ...req.body, user: userId })
      .then((comment) => {
        TaskModel.findByIdAndUpdate(
          req.body.task,
          { $push: { comments: comment._id } },
          { new: true }
        )
          .then(() => res.status(201).send(comment))
          .catch((reason) => {
            res.status(400).json(reason);
          });
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }
}

export default CommentController;
