const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
import Repository from '../repositories'

export const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

export default (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await Repository.findUserById(jwt_payload.id)
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(null, false);
      }
    })
  );
};