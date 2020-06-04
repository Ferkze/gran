import client from '.'
import { Category } from '@/models'
import { AxiosResponse } from 'axios'

export const getCategories = (): Promise<AxiosResponse<Category[]>> => {
	return client.get<Category[]>('/categories')
}
