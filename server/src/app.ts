import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import database from './config/database'

import routes from './routes'

class App {
  public express: express.Application

  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
    this.database()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes(): void {
    this.express.use('/api', routes)
  }

  private database(): void {
    mongoose.connect(database.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    })
  }
}

export default new App().express