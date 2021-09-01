const quotesRouter = require('express').Router()
const Quote = require('../models/quote')
const jwt = require('jsonwebtoken')

quotesRouter.get('/', async (req, res) => {
  const quotes = await Quote.find({}).populate('guest').populate('client')
  res.json(quotes)
})

quotesRouter.get('/:id', (req, res, next) => {
  Quote.findById(req.params.id)
    .then(quote => quote ? res.json(quote) : res.status(404).send({ error: 'No such id' }))
    .catch(err => {
      next(err)
    })
})

const getToken = requst => {
  const authorization = requst.get('authorization')
  return authorization && authorization
    .toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null
}

quotesRouter.post('/', async (req, res) => {
  const body = req.body

  const token = getToken(req)
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return res.status(400).json({ error: 'token expired or invalid' })
    }

    if (body.serviceItem === undefined) {
      return res.status(400).json({ error: 'serviceItem missing' })
    }

    const userId = decodedToken.id

    // const guestQuote = new Quote({
    //   serviceItem: body.serviceItem,
    //   comment: body.comment,
    //   guest: userId
    // })

  }
})

quotesRouter.delete('/:id', (req, res, next) => {
  Quote.findOneAndDelete(req.params.id)
    .then(deletedItem => {
      res.json(deletedItem)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = quotesRouter
