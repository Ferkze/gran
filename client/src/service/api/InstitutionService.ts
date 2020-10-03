import client from './ApiService'
import { Institution } from '@/models'
import { AxiosResponse } from 'axios'

interface InstitutionsResponse {
	institutions: Institution[]
}

class InstitutionService {

	async getInstitutions(): Promise<Institution[]> {
		const cachedInstitutions = this.getCachedInstitutions()
		if (cachedInstitutions) return cachedInstitutions
		
		const response = await client.get<InstitutionsResponse>('/institutions')
		const institutions = response.data.institutions
		this.setCachedInstitutions(institutions)
		return institutions
	}

	private getCachedInstitutions() {
		const institutionsSessionCache = sessionStorage.getItem('gran.institutions')
		if (institutionsSessionCache) {
			return JSON.parse(institutionsSessionCache)
		}
		return null
	}

	private setCachedInstitutions(institutions: Institution[]) {
		sessionStorage.setItem('gran.institutions', JSON.stringify(typeof institutions == 'object' ? institutions : [] ))
	}
}

export default new InstitutionService()
