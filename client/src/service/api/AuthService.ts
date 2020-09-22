
import client, { setAuthToken } from './ApiService'
import AuthTokenPersistanceService from '../auth/token.persistance'
import AuthUserPersistanceService from '../auth/user.persistance'
import { User } from '@/models'
import { AuthResponse, LoginData, RegisterData } from '@/models/auth'

class AuthService {

	async login(payload: LoginData): Promise<User> {
		let user = this._currentUser()
		if (user !== null && user.email === payload.email) {
			return user
		} else {
			AuthTokenPersistanceService.removeToken()
		}
		const response = await client.post<AuthResponse>('/auth/login', payload)
		setAuthToken(response.data.token)
		AuthTokenPersistanceService.saveToken(response.data.token)
		return response.data.user
	}

	async silentLogin(): Promise<User | null> {
		const userToken = AuthTokenPersistanceService.getToken()
		if (!userToken) {
			return null
		}
		setAuthToken(userToken)
		let user = AuthUserPersistanceService.getUser()
		if (user) {
			return user
		}
		user = await this.fetchUser()
		if (user) {
			AuthUserPersistanceService.saveUser(user)
		} else {
			AuthUserPersistanceService.removeUser()
		}
		return user
	}

	async register(payload: RegisterData): Promise<User> {
		const response = await client.post<AuthResponse>('/auth/register', payload)
		setAuthToken(response.data.token)
		AuthTokenPersistanceService.saveToken(response.data.token)
		return response.data.user
	}

	async logout() {
		setAuthToken('')
		AuthTokenPersistanceService.removeToken()
		AuthUserPersistanceService.removeUser()
	}

	private async fetchUser(): Promise<User | null> {
		if (!client.defaults.headers.common['Authorization']) {
			return null
		}
		const response = await client.get('/auth/current')
		if (response.data.error) {
			alert(response.data.error)
			return null
		}
		return response.data.user
	}

	private _currentUser(): User | null {
		return AuthUserPersistanceService.getUser()
	}

}

export default new AuthService()