import { InstitutionUsecases } from '.'
import { Institution } from '../models/entities/Institution'
import { Repositories } from '../repositories'

export class InstitutionUsecasesImpl implements InstitutionUsecases {

	constructor(private repo: Repositories) {}
	
	async listInstitutions(): Promise<Institution[]> {
		return await this.repo.institutions.getAllInstitutions()
	}

}