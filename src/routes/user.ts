import express from 'express';
import passport from 'passport';
import { UserController } from '../controllers';

const router = express.Router();

router.post('/', passport.authenticate('jwt'), UserController.create);

export default router;
