import { Request, Response } from 'express'
import { connection } from 'mongoose'
import BaseController from './base.controller'

export default class IndexController extends BaseController {
	public async index(_: Request, res: Response): Promise<Response> {
		return this.dbHealth(_, res)
	}

	public async serverHealth(_: Request, res: Response): Promise<Response> {
		return this.dbHealth(_, res)
	}

	public async dbHealth(_: Request, res: Response): Promise<Response> {
		if (connection.readyState == 1) {
			return res.status(200).json({ db: { status: 'up' } })
		} else {
			return res.status(500).json({ db: { status: 'down' } })
		}
	}
}
