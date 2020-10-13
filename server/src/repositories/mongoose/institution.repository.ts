import { InstitutionRepository } from '..'
import { Institution } from '../../models/entities/Institution'
import InstitutionModel, { IInstitution } from './models/InstitutionModel'

class MongooseInstitutionRepository implements InstitutionRepository {

	async getAllInstitutions(): Promise<Institution[]> {
		const institutions = await InstitutionModel.find()
		return institutions.map(i => i.getInstitution())
	}
	async findInstitutionById(id: string): Promise<Institution> {
		const institution = await InstitutionModel.findById(id)
		return institution.getInstitution()
	}
	async saveInstitution(institution: Institution): Promise<Institution> {
		const createdInstitution = await InstitutionModel.create(institution)
		return createdInstitution.getInstitution()
	}
	async updateInstitution(institution: Institution): Promise<Institution> {
		const { id, ...data } = institution
		const updatedInstitution = await InstitutionModel.findOneAndUpdate({ _id: id }, data)
		return updatedInstitution.getInstitution()
	}
	async deleteInstitution(institutionId: string): Promise<void> {
		await InstitutionModel.deleteOne({ _id: institutionId })
	}

}

export default new MongooseInstitutionRepository()