const quotesRouter = require('express').Router()
const Quote = require('../models/quote')
const Client = require('../models/client')

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

quotesRouter.post('/', async (req, res) => {
  const body = req.body
  const client = await Client.findById(body.clientId)

  if (body.serviceItem === undefined) {
    return res.status(400).json({ error: 'serviceItem missing' })
  }

  const quote = new Quote({
    date: new Date(),
    serviceItem: body.serviceItem.map(i => {
      const obj = {
        item: i.item,
        unit: i.unit
      }
      return obj
    }),
    client: client._id
  })

  const savedQuote = await quote.save()
  client.quotes = client.quotes.concat(savedQuote._id)
  await client.save()

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
