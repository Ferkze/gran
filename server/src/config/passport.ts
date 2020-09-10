import Repository from '../repositories'
import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret'
}

export default (passport: PassportStatic): void => {
	passport.use(
		new Strategy(opts, async (jwtPayload, done) => {
			try {
				const user = await Repository.UserRepository.findUserById(jwtPayload.id)
				if (user) {
					return done(null, user)
				}
				return done(null, false)
			} catch (error) {
				return done(null, false)
			}
		})
	)
}