import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import databaseConfig from './config/database'
import routes from './routes'
import passport from 'passport'
import passportConfig from './config/passport'
import { exit } from 'process'

class App {
	public express: express.Application

	constructor() {
		this.express = express()

		try {
			this.config()
			this.middlewares()
			this.routes()
		} catch (error) {
			console.error('Não foi possível iniciar o servidor:', error)
			exit(0)
		}
	}

	private middlewares(): void {
		this.express.use(express.json())
		this.express.use(cors())
		this.express.use(passport.initialize())
		require('./config/passport')
	}

	private async config(): Promise<void> {
		dotenv.config()
		passportConfig(passport)
		await databaseConfig()
	}

	private routes(): void {
		this.express.use('/api', routes)
	}

}

export default new App().express