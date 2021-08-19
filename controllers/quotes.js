const quotesRouter = require('express').Router()
const Quote = require('../models/quote')
// const Client = require('../models/client')
const Guest = require('../models/guest')
const jwt = require('jsonwebtoken')

quotesRouter.get('/', async (req, res) => {
  const quotes = await Quote.find({}).populate('client', { username: 1, name: 1 })

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

  const guest = await Guest.findById(body.guestId)

  const token = getToken(req)
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return res.status(400).json({ error: 'token expired or invalid' })
    }

    if (body.serviceItem === undefined) {
      return res.status(400).json({ error: 'serviceItem missing' })
    }
  }
  const quote = new Quote({
    serviceItem: body.serviceItem.map(i => {
      const obj = {
        item: i.item,
        unit: i.unit
      }
      return obj
    }),
    client: guest.id
  })

  const savedQuote = await quote.save()
  guest.quotes = guest.quotes.concat(savedQuote._id)
  await guest.save()

  res.json(savedQuote)
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
