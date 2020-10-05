import express from 'express';
import { ProjectModel, TaskModel } from '../models';

class ProjectController {
  //TODO: при добавлении надо добавить пользователя
  static create(req: express.Request, res: express.Response) {
    const projectData = {
      name: req.body.name,
    };
    ProjectModel.create(projectData)
      .then((project) => {
        res.send(project);
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
