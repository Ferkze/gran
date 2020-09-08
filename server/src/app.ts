import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import routes from './routes'
import passport from 'passport'
import passportConfig from './config/passport'

class App {
	public express: express.Application

	constructor() {
		this.express = express()

		this.config()
		this.middlewares()
		this.database()
		this.routes()
	}

	private middlewares(): void {
		this.express.use(express.json())
		this.express.use(cors())
		this.express.use(passport.initialize())
		require('./config/passport')
	}

	private config(): void {
		passportConfig(passport)
		dotenv.config()
	}

	private routes(): void {
		this.express.use('/api', routes)
	}

	private async database(): Promise<void> {
		console.info(`Connecting to the database using string: ${process.env.MONGODB_CONNECTION}`)
		try {
			await mongoose.connect(process.env.MONGODB_CONNECTION, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: true
			})
			console.log('Successfully connected to the database')
		} catch (error) {
			console.log('Could not connect to the database:', error)
		}
	}
}

export default new App().express