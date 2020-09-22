import Axios from 'axios'
import { Token } from '@/models/auth'

let serverHost = process.env.VUE_APP_SERVER_HOST
if (!serverHost) {
	serverHost = process.env.NODE_ENV == 'development' ? 'http://localhost:5000' : 'https://gran-server.azurewebsites.net'
}
const ApiSerivce = Axios.create({ baseURL: `${serverHost}/api` })

export const setAuthToken = (token: Token) => {
	console.log('Setting auth token', token)
	if (token) {
		ApiSerivce.defaults.headers.common['Authorization'] = token
	} else {
		delete ApiSerivce.defaults.headers.common['Authorization']
	}
}

export const getAuthToken = (): Token => ApiSerivce.defaults.headers.common['Authorization']

export default ApiSerivce
