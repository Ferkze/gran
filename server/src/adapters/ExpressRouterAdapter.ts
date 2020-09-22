import { Request, Response } from 'express'

export class ExpressRouterAdapter {
	static adapt(handler) {
		return async (req: Request, res: Response): Promise<void> => {
			const httpRequest = {
				body: req.body,
				params: req.params,
				query: req.query
			}
			const httpResponse = await handler(httpRequest)
			res.status(httpResponse.statusCode).json(httpResponse.body)
		}
	}
}