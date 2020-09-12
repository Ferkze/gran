import { Token } from '@/models/auth'

class AuthTokenPersistanceService {
	saveToken(token: Token): void {
		window.localStorage.setItem('gran.token', token)
	}
	
	getToken(): Token | null {
		return window.localStorage.getItem('gran.token')
	}
	
	removeToken(): void {
		window.localStorage.removeItem('gran.token')
	}
}

export default new AuthTokenPersistanceService()