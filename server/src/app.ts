import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import database from './config/database'

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
    this.express.use(express.static('/dist'))
    this.express.use('/api', routes)
  }

  private async database(): Promise<void> {
    console.info(`Connecting to the database using string: ${database.connectionString}`)
    const mon = await mongoose.connect(database.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })
    mon.connection.on('open', () => {
      console.info('Connected to the database...')
    })
    mon.connection.on('error', (err) => {
      console.error(`Error connecting to the database: ${err}`)
    })
  }
}

export default new App().express