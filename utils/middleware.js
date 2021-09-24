const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')


const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('--------------------')
  next()
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'wrong id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  logger.error('undefined error', error.message)
  next(error)
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: 'cant find endpoints' })
  next()
}

const userExtractor = async (req, res, next) => {
  const cert = fs.readFileSync('public.pem')  // get public key

  if (req.token) {
    const decodedToken = jwt.verify(req.token, cert, { algorithms: ['RS256'] })
    
    req.user = await User.findOne({email:decodedToken.email}).exec()
  }

  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  userExtractor,
  tokenExtractor
}
