import express from 'express';
import passport from 'passport';
const controller = require('../controllers/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/google/callback', passport.authenticate('google'), controller.loginGoogle);
router.get('/google', passport.authenticate('google', { scope: ['email'] }));

export default router;
