import client from './ApiService'
import { Institution } from '@/models'
import { AxiosResponse } from 'axios'

interface InstitutionsResponse {
	institutions: Institution[]
}

class InstitutionService {

	async getInstitutions(): Promise<Institution[]> {
		return await (await client.get<InstitutionsResponse>('/institutions')).data.institutions
	}
}

export default new InstitutionService()
