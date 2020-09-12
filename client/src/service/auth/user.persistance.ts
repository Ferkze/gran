import { User } from '@/models'

class AuthUserPersistanceService {
	saveUser(user: User): void {
		window.localStorage.setItem('gran.user', JSON.stringify(user))
	}
	
	getUser(): User | null {
		const userStr = window.localStorage.getItem('gran.user')
		if (!userStr) return null
		return JSON.parse(userStr) as User
	}
	
	removeUser(): void {
		window.localStorage.removeItem('gran.user')
	}
}

export default new AuthUserPersistanceService()