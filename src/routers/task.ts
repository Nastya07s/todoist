import express from 'express';
import passport from 'passport';
import { TaskController } from '../controllers';

const router = express.Router();

router.get('/:id', passport.authenticate('jwt'), TaskController.getOne);
router.patch('/:id', passport.authenticate('jwt'), TaskController.update);
router.delete('/:id', passport.authenticate('jwt'), TaskController.delete);
router.post('/', passport.authenticate('jwt'), TaskController.create);

export default router;
