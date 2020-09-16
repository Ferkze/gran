import { Request, Response } from 'express'
import usecases from '../usecases'
import debug from 'debug'

const log = debug('app:group:controller')

class GroupController {

	async update(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const group = await usecases.group.editGroup(req.params.groupId, data)
			return res.status(200).json({ group })
		} catch (error) {
			log('Erro ao editar um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async readByUser(req: Request, res: Response): Promise<Response> {
		try {
			const groups = await usecases.group.listGroups(req.user['id'])
			return res.status(200).json({ groups })
		} catch (error) {
			log('Erro ao obter orçamentos de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const data = req.body
		try {
			const group = await usecases.group.registerGroup(data)
			return res.status(200).json({ group })
		} catch (error) {
			log('Erro ao criar um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async joinGroup(req: Request, res: Response): Promise<Response> {
		try {
			const group = await usecases.group.joinGroup(req.user['id'], req.params.groupId)
			return res.status(200).json({ group })
		} catch (error) {
			log('Erro ao entrar em um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

}

export default new GroupController()