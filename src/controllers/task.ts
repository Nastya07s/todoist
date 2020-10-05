import express from 'express';

import { ProjectModel, TaskModel } from '../models';
import { ITask } from '../models/Task';

class TaskController {
  static create(req: express.Request, res: express.Response) {
    const taskData = {
      title: req.body.title,
      comments: [],
      description: req.body.description,
      priority: req.body.priority,
      project: req.body.project,
    };
    TaskModel.create(taskData)
      .then((task) => {
        res.send(task);
      })
      .catch((reason) => {
        res.json(reason);
      });
  }

  static getOne(req: express.Request, res: express.Response) {
    const idTask = req.params.id;
    TaskModel.findById(idTask)
      .then((task) => {
        res.send(task);
      })
      .catch((reason) => {
        res.json(reason);
      });
  }

  static update(req: express.Request, res: express.Response) {
    const idTask = req.params.id;

    const taskData = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
    };

    TaskModel.findByIdAndUpdate(idTask, taskData, { new: true })
      .then((task) => {
        res.send(task);
      })
      .catch((reason) => {
        res.json(reason);
      });
  }

  static delete(req: express.Request, res: express.Response) {
    const idTask = req.params.id;
    TaskModel.findByIdAndRemove(idTask)
      .then(() => {
        res.send('Task delete');
      })
      .catch((reason) => {
        res.json(reason);
      });
  }
}

export default TaskController;
