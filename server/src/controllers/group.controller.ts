import { Request, Response } from 'express'
import usecases from '../usecases'
import debug from 'debug'
import BaseController from './base.controller'

const log = debug('app:group:controller')

export default class GroupController extends BaseController {

	async update(req: Request, res: Response): Promise<Response> {
		const data = req.body
		const { groupId } = req.params
		try {
			const group = await usecases.group.editGroup(groupId, data)
			return res.status(200).json({ group })
		} catch (error) {
			log('Erro ao editar um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async readByUser(req: Request, res: Response): Promise<Response> {
		const userId = req.user['id']
		try {
			const groups = await usecases.group.listGroups(userId)
			return res.status(200).json({ groups })
		} catch (error) {
			log('Erro ao obter orçamentos de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		const data = req.body.group
		const userId = req.user['id']
		try {
			const group = await usecases.group.registerGroup(userId, data)
			return res.status(200).json({ group })
		} catch (error) {
			log('Erro ao criar um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		const userId = req.user['id']
		const { groupId } = req.params
		try {
			const deleted = await usecases.group.deleteGroup(userId, groupId)
			return res.status(200).json({ deleted })
		} catch (error) {
			log('Erro ao deletar grupo', error)
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

	async updateMembers(req: Request, res: Response): Promise<Response> {
		const { groupId } = req.params
		const members = req.body.members
		try {
			const group = await usecases.group.editGroup(groupId, { members })
			return res.status(200).json({ members: group.members })
		} catch (error) {
			log('Erro ao entrar em um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

	async createPlanning(req: Request, res: Response): Promise<Response> {
		const { groupId } = req.params
		const data = req.body.planning
		console.log(req.body)
		try {
			const planning = await usecases.planning.registerGroupPlanning(groupId, data)
			return res.status(200).json({ planning })
		} catch (error) {
			log('Erro ao entrar em um orçamento de grupo', error)
			res.status(500).json({ error: error.message })
		}
	}

}
