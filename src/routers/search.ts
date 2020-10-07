import express from 'express';
import passport from 'passport';
import { SearchController } from '../controllers';

const router = express.Router();

router.get('/', passport.authenticate('jwt'), SearchController.byNameTaskOrProject);

export default router;
