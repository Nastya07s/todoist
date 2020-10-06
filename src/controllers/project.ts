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
    const {userId} = jwt.verify(token, keys.jwt);
    const projectData = {
      name: req.body.name,
      users: [userId]
    };
    ProjectModel.create(projectData)
      .then((project) => {
        UserModel.findByIdAndUpdate(
          userId,
          { $push: { projects: project._id } },
          () => {
            res.send(project);
          }
        );
      })
      .catch((reason) => {
        res.json(reason);
      });
  }

  static getOne(req: express.Request, res: express.Response) {
    const idProject = req.params.id;

    ProjectModel.findById(idProject).then((project) => {
      TaskModel.find({ project: idProject }).then((tasks) => {
        const projectObject = { project, tasks: [...tasks] };
        res.send(projectObject);
      });
    });
  }
  static update(req: express.Request, res: express.Response) {
    const idProject = req.params.id;
    const projectData = {
      name: req.body.name,
    };

    ProjectModel.findByIdAndUpdate(idProject, projectData, { new: true })
      .then((project) => {
        res.send(project);
      })
      .catch((reason) => {
        res.json(reason);
      });
  }
  static delete(req: express.Request, res: express.Response) {
    const idProject = req.params.id;
    ProjectModel.findByIdAndRemove(idProject).then(() => {
      TaskModel.deleteMany({ project: idProject }).then(() =>
        res.send('Project deleted')
      );
    });
  }
}

export default ProjectController;
