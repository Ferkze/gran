import debug from 'debug'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

const log = debug('app:auth:middleware')

class AuthenticationMiddleware {
	userRequired(req: Request, res: Response, next: NextFunction): void {
		passport.authenticate('jwt', { session: false }, function(err, user) {
			if (err || !user) {
				log('Usuário não autenticado')
				return res.status(401).json({ error: 'Usuário precisa estar autenticado' })
			}
			log('Usuário autenticado:', user['id'])
			next()
		})(req, res, next)
	}
}

export default new AuthenticationMiddleware()