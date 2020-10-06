import express from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

const router = express.Router();

// router.post('/', passport.authenticate('jwt'), UserController.create);
// router.get('/', passport.authenticate('google'), UserController.get);
router.get('/', passport.authenticate('jwt'), UserController.get);

export default router;
