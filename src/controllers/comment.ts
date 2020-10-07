import express from 'express';
import { CommentModel, TaskModel } from '../models';
import sendMail from '../utils/sendMail';

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class CommentController {
  static async create(req: express.Request, res: express.Response) {
    let token = req.headers.authorization;
    if (token?.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    const { userId } = jwt.verify(token, keys.jwt);

    try {
      const text: string = req.body.text + ' ';
      const comment = await CommentModel.create({ text, user: userId });
      const task: any = await TaskModel.findByIdAndUpdate(
        req.body.task,
        { $push: { comments: comment._id } },
        { new: true }
      );
      res.status(201).send(comment);

      await sendMail(text, task?.title);
    } catch (reason) {
      res.status(400).json(reason);
    }
  }
}

export default CommentController;
