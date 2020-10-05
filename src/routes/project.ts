import express from "express";
import { ProjectController } from '../controllers';

const router = express.Router();

router.get('/:id', ProjectController.getOne);
router.patch('/:id', ProjectController.update);
router.delete('/:id', ProjectController.delete);
router.post('/', ProjectController.create);

export default router;
