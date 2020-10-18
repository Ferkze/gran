import { PlanningRepository } from '..'
import { Planning, PlanningFilter } from '../../models/entities/Planning'
import { User } from '../../models/entities/User'
import GroupModel from './models/GroupModel'
import UserModel from './models/UserModel'

export class MongoosePlanningRepository implements PlanningRepository {

	async getFilteredPlannings(filter: PlanningFilter): Promise<Planning[]> {
		const query = {}
		if (filter.month)
			query['plannings.month'] = filter.month
		if (filter.year)
			query['plannings.year'] = filter.year
		if (filter.group) {
			const doc = await GroupModel.findOne({
				_id: filter.group,
				...query
			}, 'plannings')
			return doc.plannings.map(p => p.getPlanning())
		} else {
			const doc = await UserModel.findOne({
				_id: filter.user,
				...query
			}, 'plannings')
			return doc.plannings.map(p => p.getPlanning())
		}
	}

	async getUserPlannings(userId: User['id']): Promise<Planning[]> {
		const userDoc = await UserModel.findById(userId)
		return userDoc.plannings.map(p => p.getPlanning())
	}

	async findUserPlanningById(userId: User['id'], planningId: string): Promise<Planning> {
		const userDoc = await UserModel.findById(userId)
		return userDoc.plannings.id(planningId).getPlanning()
	}
	
	async saveUserPlanning(userId: User['id'], planning: Planning): Promise<Planning> {
		const userDoc = await UserModel.findById(userId)
		userDoc.plannings.push(planning)
		await userDoc.save()
		return userDoc.plannings[userDoc.plannings.length-1].getPlanning()
	}

	async updateUserPlanning(userId: User['id'], planningId: string, data: Planning): Promise<Planning> {
		const userDoc = await UserModel.findById(userId)
		const planningDoc = userDoc.plannings.id(planningId)
		for (const key in data) {
			planningDoc[key] = data[key]
		}
		await userDoc.save()
		return planningDoc.getPlanning()
	}

	async deleteUserPlanning(userId: User['id'], planningId: string): Promise<void> {
		const userDoc = await UserModel.findById(userId)
		userDoc.plannings.id(planningId).remove()
		await userDoc.save()
		return
	}

	async planningExists(userId: User['id'], planningId: Account['id']): Promise<boolean> {
		const userDoc = await UserModel.findById(userId)
		return userDoc.plannings.some(acc => acc.id == planningId)
	}
	
	async getGroupPlannings(groupId: string): Promise<Planning[]> {
		const groupDoc = await GroupModel.findById(groupId)
		return groupDoc.plannings.map(p => p.getPlanning())
	}

	async findGroupPlanningById(groupId: string, planningId: string): Promise<Planning> {
		const groupDoc = await GroupModel.findById(groupId)
		return groupDoc.plannings.id(planningId).getPlanning()
	}

	async saveGroupPlanning(groupId: string, planning: Planning): Promise<Planning> {
		const groupDoc = await GroupModel.findById(groupId)
		groupDoc.plannings.push(planning)
		await groupDoc.save()
		return groupDoc.plannings[groupDoc.plannings.length-1].getPlanning()
	}

	async updateGroupPlanning(groupId: string, planningId: string, data: Planning): Promise<Planning> {
		const groupDoc = await GroupModel.findById(groupId)
		const planningDoc = groupDoc.plannings.id(planningId)
		for (const key in data) {
			planningDoc[key] = data[key]
		}
		await groupDoc.save()
		return planningDoc.getPlanning()
	}

	async deleteGroupPlanning(groupId: string, planningId: string): Promise<void> {
		const groupDoc = await GroupModel.findById(groupId)
		groupDoc.plannings.id(planningId).remove()
		await groupDoc.save()
	}

}

export default new MongoosePlanningRepository()
