import express from 'express';
import { CommentModel, TaskModel } from '../models';

class CommentController {
  // TODO: connent comment with user
  // TODO: add a lot of beautiful and small commits
  static create(req: express.Request, res: express.Response) {
    const commentData = {
      text: req.body.text,
      // user: req.body.user,
    };

    CommentModel.create(commentData).then((comment) => {
      TaskModel.findByIdAndUpdate(
        req.body.task,
        { $push: { comments: comment._id } },
        { new: true }
      ).then(() => res.send(comment))
    });
  }
}

export default CommentController;
