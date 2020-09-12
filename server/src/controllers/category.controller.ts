import { Request, Response } from 'express'
import { Category } from '../models/entities/Category'
import usecases from '../usecases'
import debug from 'debug'

const log = debug('app:category:controller')

class CategoryController {
	public async index(req: Request, res: Response): Promise<Response> {
		const categories = await usecases.category.listCategories(req.user['id'])
		return res.status(200).json({ categories })
	}

	public async store(req: Request, res: Response): Promise<Response> {
		try {
			const category = await usecases.category.registerCategory(req.body.category as Category)
			return res.status(201).json({ category })
		} catch (error) {
			log('Erro ao gravar categoria', error)
			return res.status(500).json({ error: error.message })
		}
	}
}

export default new CategoryController()
