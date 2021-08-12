const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('--------------------')
  next()
}

const errorHandler = (error, res, req, next) => {
  logger.error('undefined error', res.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'wrong id' })
  }
  next()
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: 'cant find endpoints' })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}
