import client from './ApiService'
import { Institution } from '@/models'
import { AxiosResponse } from 'axios'

class InstitutionService {

	getInstitutions(): Promise<AxiosResponse<Institution[]>> {
		return client.get<Institution[]>('/institutions')
	}
}

export default new InstitutionService()
