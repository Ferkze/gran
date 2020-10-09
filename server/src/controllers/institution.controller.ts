import { Request, Response } from 'express'
import usecases from '../usecases'
import debug from 'debug'
import BaseController from './base.controller'

const log = debug('app:institution:controller')

export default class InstitutionController extends BaseController {

	public async index(req: Request, res: Response): Promise<Response> {
		try {
			const institutions = await usecases.instution.listInstitutions()
			return res.json({ institutions })
		} catch (error) {
			log('Erro ao buscar instituições', error)
			return res.status(500).json({ error })
		}
	}

}
