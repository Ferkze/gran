import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import databaseConfig from './config/database'
import routes from './routes'
import passport from 'passport'
import passportConfig from './config/passport'

class App {
	public server: express.Application

	constructor() {
		this.server = express()

		this.config()
		this.middlewares()
		this.routes()
	}

	private middlewares(): void {
		this.server.use(express.json())
		this.server.use(cors())
		this.server.use(passport.initialize())
		require('./config/passport')
	}

	private async config(): Promise<void> {
		dotenv.config()
		passportConfig(passport)
		await databaseConfig()
	}

	private routes(): void {
		this.server.use('/api', routes)
	}

}

export default new App()