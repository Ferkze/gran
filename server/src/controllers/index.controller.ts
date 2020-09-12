import { Request, Response } from 'express'

class IndexController {
	public async index(req: Request, res: Response): Promise<Response> {
		return res.status(200).json({ ok: true })
	}
}

export default new IndexController()