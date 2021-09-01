const quotesRouter = require('express').Router()
const Quote = require('../models/quote')

quotesRouter.get('/', async (req, res) => {
  const quotes = await Quote.find({}).populate('guest').populate('client',{quotes:1})
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
  const user = req.user

  if (!req.token || !user.id) {
    return res.status(400).json({ error: 'token expired or invalid' })
  }

  if (body.serviceItem === undefined) {
    return res.status(400).json({ error: 'serviceItem missing' })
  }

  const quote = new Quote({
    serviceItem: body.serviceItem,
    comment: body.comment,
    client: user.id
  })

  const savedQuote = await quote.save()

  user.quotes = user.quotes.concat(savedQuote.id)
  await user.save()

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
