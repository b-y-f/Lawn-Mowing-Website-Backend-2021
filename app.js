const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const qouteRouter = require('./controllers/quotes')
const clientsRouter = require('./controllers/clients')
const loginRouter = require('./controllers/login')
const guestsRouter = require('./controllers/guests')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(err => {
    logger.info('fail to connect MongoDB', err.message)
  })

app.use('/api/quotes', qouteRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/guests', guestsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
