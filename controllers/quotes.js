const quotesRouter = require('express').Router()
const Quote = require('../models/quote')

quotesRouter.get('/', (req, res) => {
  Quote.find({}).then(quotes => {
    res.json(quotes)
  })
})

quotesRouter.get('/:id', (req, res, next) => {
  Quote.findById(req.params.id)
    .then(quote => quote ? res.json(quote) : res.status(404).send({ error: 'No such id' }))
    .catch(err => {
      next(err)
    })
})

quotesRouter.post('/', (req, res) => {
  const body = req.body

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
    client: {
      name: body.client.name,
      phone: body.client.phone
    }
  })

  quote.save().then(saved => {
    res.json(saved)
  })
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
