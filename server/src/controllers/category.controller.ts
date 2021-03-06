import { Request, Response } from 'express'
import usecases from '../usecases'
import debug from 'debug'
import BaseController from './base.controller'

const log = debug('app:category:controller')

export default class CategoryController extends BaseController {

	async update(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const category = await usecases.category.editCategory(req.params.categoryId, data)
			return res.status(200).json({ category })
		} catch (error) {
			log('Erro ao editar a categoria de transações', error)
			return res.status(500).json({ error: error.message })
		}
	}

	async read(req: Request, res: Response): Promise<Response> {
		try {
			const categories = await usecases.category.listCategories()
			return res.status(200).json({ categories })
		} catch (error) {
			log('Erro ao listar categorias de transações do usuário', error)
			return res.status(500).json({ error: error.message })
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const category = await usecases.category.registerCategory(data)
			return res.status(200).json({ category })
		} catch (error) {
			log('Erro ao gravar uma nova categoria de transações', error)
			return res.status(500).json({ error: error.message })
		}
	}

}
