import express from 'express';
import passport from 'passport';
import { ProjectController } from '../controllers';

const router = express.Router();

router.get('/:id', passport.authenticate('jwt'), ProjectController.getOne);
router.patch('/:id', passport.authenticate('jwt'), ProjectController.update);
router.delete('/:id', passport.authenticate('jwt'), ProjectController.delete);
router.post('/', passport.authenticate('jwt'), ProjectController.create);
// router.get('/:id', passport.authenticate('google'), ProjectController.getOne);
// router.patch('/:id', passport.authenticate('google'), ProjectController.update);
// router.delete('/:id', passport.authenticate('google'), ProjectController.delete);
// router.post('/', passport.authenticate('google'), ProjectController.create);

export default router;
