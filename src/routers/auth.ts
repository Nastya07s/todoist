import express from 'express';
import passport from 'passport';
import { AuthController } from '../controllers';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/google/callback', passport.authenticate('google'), AuthController.loginGoogle);
router.get('/google', passport.authenticate('google', { scope: ['email'] }));

export default router;
