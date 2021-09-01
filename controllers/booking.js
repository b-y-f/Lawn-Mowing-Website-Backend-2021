const booksRouter = require('express').Router()
const Booking = require('../models/booking')

booksRouter.get('/', async (req, res) => {
  const bookings = await Booking.find({}).populate('client',{bookings:1})
  res.json(bookings)
})

booksRouter.get('/:id', (req, res, next) => {
  Booking.findById(req.params.id)
    .then(b => b ? res.json(b) : res.status(404).send({ error: 'No such id' }))
    .catch(err => {
      next(err)
    })
})

booksRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user

  if (!req.token || !user.id) {
    return res.status(401).json({ error: 'token expired or invalid' })
  }

  if (body.serviceItem === undefined) {
    return res.status(400).json({ error: 'serviceItem missing' })
  }

  const booking = new Booking({
    serviceItem: body.serviceItem,
    comment: body.comment,
    client: user.id
  })

  const savedBooking = await booking.save()

  user.bookings = user.bookings.concat(savedBooking.id)
  await user.save()

  res.json(savedBooking)

})

booksRouter.delete('/:id', (req, res, next) => {
  Booking.findOneAndDelete(req.params.id)
    .then(deletedItem => {
      res.json(deletedItem)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = booksRouter
