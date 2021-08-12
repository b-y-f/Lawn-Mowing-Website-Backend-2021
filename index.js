require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const Quote = require('./models/quote')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const logger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('--------------------')
  next()
}

const errorHandler = (error, res, req, next) => {
  console.log(res.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'wrong id' })
  }
  next()
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: 'cant find endpoints' })
}
app.use(logger)

app.get('/api/quotes', (req, res) => {
  Quote.find({}).then(quotes => {
    res.json(quotes)
  })
})

app.get('/api/quotes/:id', (req, res, next) => {
  Quote.findById(req.params.id)
    .then(quote => quote ? res.json(quote) : res.status(404).send({ error: 'No such id' }))
    .catch(err => {
      next(err)
    })
})

app.post('/api/quotes', (req, res) => {
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

app.delete('/api/quotes/:id', (req, res, next) => {
  Quote.findOneAndDelete(req.params.id)
    .then(deletedItem => {
      res.json(deletedItem)
    })
    .catch(err => {
      next(err)
    })
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
