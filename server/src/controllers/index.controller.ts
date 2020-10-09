import { Request, Response } from 'express'
import BaseController from './base.controller'

export default class IndexController extends BaseController {
	public async index(req: Request, res: Response): Promise<Response> {
		return res.status(200).json({ ok: true })
	}
}
