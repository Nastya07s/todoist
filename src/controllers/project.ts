import express from 'express';
import { ProjectModel, TaskModel, UserModel } from '../models';

const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class ProjectController {
  static async create(req: express.Request, res: express.Response) {
    let token = req.headers.authorization;
    if (token?.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    try {
      const { userId } = jwt.verify(token, keys.jwt);
      const project = await ProjectModel.create({
        ...req.body,
        users: [userId],
      });
      await UserModel.findByIdAndUpdate(userId, {
        $push: { projects: project._id },
      });
      
      res.status(201).send(project);
    } catch (reason) {
      res.status(400).json(reason);
    }
  }

  static async getOne(req: express.Request, res: express.Response) {
    const idProject = req.params.id;
    try {
      const project = await ProjectModel.findById(idProject);
      const tasks = await TaskModel.find({ project: idProject });
      const projectObject = { project, tasks: [...tasks] };

      res.send(projectObject);
    } catch (reason) {
      res.status(404).json(reason);
    }
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

  static async delete(req: express.Request, res: express.Response) {
    const idProject = req.params.id;
    try {
      await ProjectModel.findByIdAndRemove(idProject);
      await TaskModel.deleteMany({ project: idProject });

      res.status(204).send();
    } catch (reason) {
      res.status(400).json(reason);
    }
  }
}

export default ProjectController;
