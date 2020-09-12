import Repository from '../repositories'
import { PassportStatic } from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import debug from 'debug'

const log = debug('app:passport')

export const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret'
}

export default (passport: PassportStatic): void => {
	log('Configurando autenticação usando o passport')
	passport.use(
		new Strategy(opts, async (jwtPayload, done) => {
			try {
				const user = await Repository.user.findUserById(jwtPayload.id)
				if (user) {
					return done(null, user)
				}
				return done(null, false)
			} catch (error) {
				return done(error, false)
			}
		})
	)
}