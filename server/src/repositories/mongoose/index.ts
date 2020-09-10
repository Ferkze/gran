import userRepository from './user.repository'
import institutionRepository from './institution.repository'
import { Repositories } from '..'

const repository: Repositories = {
	user: userRepository,
	institutions: institutionRepository
}

export default repository
