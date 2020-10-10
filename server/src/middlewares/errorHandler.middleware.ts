import debug from 'debug'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../models/errors/ValidationError'

const log = debug('app:errorHandler:middleware')

class ErrorHandlerMiddleware {
	handleErr(req: Request, res: Response, next: NextFunction): void {
		try {
			next()
		} catch (error) {
			if (error instanceof ValidationError) {
				log(`Erro de validação: ${error.name}\n`)
				log(`${error.message}: ${error.stack}`)
				res.status(400).json({ error: error.message })
				return 
			}
			log(`Erro inesperado: ${error.name}\n`)
			log(`${error.message}: ${error.stack}`)
			res.status(403).json({ error: error.message })
			return
		}
	}
}

export default new ErrorHandlerMiddleware()