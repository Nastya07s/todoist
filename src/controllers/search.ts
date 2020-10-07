import express from 'express';
import { ProjectModel, TaskModel } from '../models';
const controller = require('./auth');

class SearchController {
  static async byNameTaskOrProject(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const name = req.query.name;

      if (!name) return res.status(400).json({ message: 'No query parameter "name"' });

      const projects = await ProjectModel.find({ name });
      const tasks = await TaskModel.find({ title: name });

      if (!projects.length && !tasks.length)
        return res
          .status(404)
          .json({ message: 'Not found any projects and any tasks' });

      res.send({ projects, tasks });
    } catch (reason) {
      res.status(400).json(reason);
    }
  }
}

export default SearchController;
