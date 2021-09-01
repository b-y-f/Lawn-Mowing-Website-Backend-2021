const jwt = require('jsonwebtoken')

const guestsRouter = require('express').Router()
const Guest = require('../models/guestQuote')

guestsRouter.post('/', async (req, res) => {
  const body = req.body

  const guest = new Guest({
    name: body.name,
    phone: body.phone,
    email: body.email
  })

  const saved = await guest.save()

  const guestToken = {
    id: saved._id
  }

  const token = jwt.sign(guestToken, process.env.SECRET)

  res.json({ name: saved.name, token })
})

guestsRouter.get('/', async (req, res) => {
  const guests = await Guest.find({}).populate('quotes', { date: 1, serviceItem: 1 })

  res.json(guests.map(g => g.toJSON()))
})

module.exports = guestsRouter
