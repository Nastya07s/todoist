import { Document } from 'mongoose';
import { Authenticator, Strategy } from 'passport';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
import { UserModel } from '../models';

const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const bcrypt = require('bcryptjs');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};

module.exports = (passport: Authenticator) => {
  passport.serializeUser(function (
    user: any,
    done: (err: any, user?: any) => void
  ) {
    done(null, user);
  });

  passport.deserializeUser(function (
    user: any,
    done: (err: any, user?: any) => void
  ) {
    done(null, user);
  });
  passport.use(
    new JwtStrategy(
      options,
      async (
        payload: { userId: any },
        done: (arg0: null, arg1: boolean | Document) => void
      ) => {
        try {
          const user = await UserModel.findById(payload.userId).select(
            'username id'
          );

          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (e) {
          console.log(e);
        }
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          '905822146489-1l0d0ofqoab7dvvdfv7kj8g7abkm0ttp.apps.googleusercontent.com',
        clientSecret: 'm16amyl_ZesY6iXy154MybLp',
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
          const email = profile.emails[0].value;

          const currentUser = await UserModel.findOne({ email });
          if (currentUser) {
            return done(null, currentUser);
          } else {
            const salt = bcrypt.genSaltSync(10);
            const randomPassword = Math.random().toString(20).substr(2, 5);
            const newUser = await new UserModel({
              login: email,
              password: bcrypt.hashSync(randomPassword, salt),
              email,
              googleId: profile.id,
            }).save();
            return done(null, newUser);
          }
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
