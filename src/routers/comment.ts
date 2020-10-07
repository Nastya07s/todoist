import express from 'express';
import passport from 'passport';
import { CommentController } from '../controllers';

const router = express.Router();

router.post('/', passport.authenticate('jwt'), CommentController.create);

export default router;
