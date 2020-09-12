import debug from 'debug'
import { Request } from 'express'

export default (req: Request, res, next): void => {
	debug('app:server')(`${req.method} ${req.path}`)
	next()
}