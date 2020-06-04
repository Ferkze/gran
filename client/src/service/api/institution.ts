import client from '.'
import { Institution } from '@/models'
import { AxiosResponse } from 'axios'

export const getInstitutions = (): Promise<AxiosResponse<Institution[]>> => {
	return client.get<Institution[]>('/institutions')
}
