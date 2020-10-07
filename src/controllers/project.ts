import express from 'express';
import { ProjectModel, TaskModel, UserModel } from '../models';

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class ProjectController {
  static create(req: express.Request, res: express.Response) {
    let token = req.headers.authorization;
    if (token?.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    const { userId } = jwt.verify(token, keys.jwt);
    ProjectModel.create({ ...req.body, users: [userId] })
      .then((project) => {
        UserModel.findByIdAndUpdate(
          userId,
          { $push: { projects: project._id } },
          () => {
            res.status(201).send(project);
          }
        );
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }

  static getOne(req: express.Request, res: express.Response) {
    const idProject = req.params.id;

    ProjectModel.findById(idProject)
      .then((project) => {
        TaskModel.find({ project: idProject })
          .then((tasks) => {
            const projectObject = { project, tasks: [...tasks] };
            res.send(projectObject);
          })
          .catch(() => res.status(404));
      })
      .catch(() => res.status(404));
  }

  static async update(req: express.Request, res: express.Response) {
    if (!req.body) return res.status(400).send({ message: 'No body' });

    const idProject = req.params.id;

    const user = await UserModel.findOne({ email: req.body.userEmail });

    if (!user) return res.status(404).json({ message: 'User do not exists' });

    ProjectModel.findByIdAndUpdate(
      idProject,
      { ...req.body, $addToSet: { users: user?._id } },
      { new: true }
    )
      .then(() => {
        res.status(204).send();
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }

  static delete(req: express.Request, res: express.Response) {
    const idProject = req.params.id;
    ProjectModel.findByIdAndRemove(idProject)
      .then(() => {
        TaskModel.deleteMany({ project: idProject })
          .then(() => res.status(204).send())
          .catch((reason) => {
            res.status(400).json(reason);
          });
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }
}

export default ProjectController;
