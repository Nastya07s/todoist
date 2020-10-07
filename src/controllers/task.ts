import express from 'express';

import { TaskModel } from '../models';

class TaskController {
  static create(req: express.Request, res: express.Response) {
    TaskModel.create({...req.body, comments: []})
      .then(() => {
        res.status(201).send();
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }

  static getOne(req: express.Request, res: express.Response) {
    const idTask = req.params.id;
    TaskModel.findById(idTask).populate('comments')
      .then((task) => {
        res.send(task);
      })
      .catch((reason) => {
        res.status(404).json(reason);
      });
  }

  static update(req: express.Request, res: express.Response) {
    const idTask = req.params.id;

    TaskModel.findByIdAndUpdate(idTask, { ...req.body }, { new: true })
      .then(() => {
        res.status(204).send();
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }

  static delete(req: express.Request, res: express.Response) {
    const idTask = req.params.id;
    TaskModel.findByIdAndRemove(idTask)
      .then(() => {
        res.status(204).send();
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }
}

export default TaskController;
