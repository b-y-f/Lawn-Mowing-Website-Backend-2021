const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('--------------------')
  next()
}

const errorHandler = (error, req, res, next) => {
  logger.error('undefined error', error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'wrong id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: 'cant find endpoints' })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}
