import { Document } from "mongoose";
import { Authenticator, Strategy } from "passport";
import { UserModel } from "../models";

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt,
};

module.exports = (passport: Authenticator) => {
  passport.use(
    new JwtStrategy(options, async (payload: { userId: any; }, done: (arg0: null, arg1: boolean | Document) => void) => {
      try {
        const user = await UserModel.findById(payload.userId).select('username id');

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
};
