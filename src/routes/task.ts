import express from "express";
import { TaskController } from '../controllers';

const router = express.Router()

router.get('/:id', TaskController.getOne);
router.patch('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);
router.post('/', TaskController.create);

export default router;
