import { InstitutionRepository } from '..'
import { Institution } from '../../models/entities/Institution'
import InstitutionModel, { IInstitution } from './models/InstitutionModel'

class MongooseInstitutionRepository implements InstitutionRepository {

	async getAllInstitutions(): Promise<Institution[]> {
		const institutions = await InstitutionModel.find()
		return institutions.map(i => this.deserialize(i))
	}
	async findInstitutionById(id: string): Promise<Institution> {
		const institution = await InstitutionModel.findById(id)
		return this.deserialize(institution)
	}
	async saveInstitution(institution: Institution): Promise<Institution> {
		const createdInstitution = await InstitutionModel.create(institution)
		return this.deserialize(createdInstitution)
	}
	async updateInstitution(institution: Institution): Promise<Institution> {
		const { id, ...data } = institution
		const updatedInstitution = await InstitutionModel.findOneAndUpdate({ _id: id }, data)
		return this.deserialize(updatedInstitution)
	}
	async deleteInstitution(institutionId: string): Promise<void> {
		await InstitutionModel.deleteOne(institutionId)
	}

	private deserialize(mongooseInstitution: IInstitution): Institution {
		if (!mongooseInstitution) {
			return null
		}
		
		return {
			id: mongooseInstitution._id,
			name: mongooseInstitution.name,
			description: mongooseInstitution.description,
			colors: mongooseInstitution.colors,
			logoUrl: mongooseInstitution.logoUrl,
			type: mongooseInstitution.type,
			createdAt: mongooseInstitution.createdAt,
			updatedAt: mongooseInstitution.updatedAt
		}
	}
	

}

export default new MongooseInstitutionRepository()