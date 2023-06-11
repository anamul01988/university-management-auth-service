import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  // console.log('Uncaught exception is detected ....')
  errorLogger.error(error)
  process.exit(1)
})

let server: Server
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connected successfully')

    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    // console.log(
    //   'Unhandled rejection is detection, we are closing our server...'
    // )
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
boostrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is recieved')
  if (server) {
    server.close()
  }
})
