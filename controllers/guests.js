const guestsRouter = require('express').Router()
const Guest = require('../models/guest')

guestsRouter.post('/', async (req, res) => {
  const body = req.body

  const guest = new Guest({
    name: body.name,
    address: body.address,
    phone: body.phone,
    email: body.email
  })

  const saved = await guest.save()

  res.json(saved)
})

guestsRouter.get('/', async (req, res) => {
  const guests = await Guest.find({}).populate('quotes', { date: 1, serviceItem: 1 })

  res.json(guests.map(g => g.toJSON()))
})

module.exports = guestsRouter
