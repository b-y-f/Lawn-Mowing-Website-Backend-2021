const booksRouter = require('express').Router()
const Booking = require('../models/booking')

booksRouter.get('/', async (req, res) => {
  const bookings = await Booking.find({}).populate('user',{bookings:1})
  res.json(bookings)
})

booksRouter.get('/:id', async(req, res, next) => {

  try {
    const bookings = await Booking.findById(req.params.id)
    res.json(bookings)
  } catch (error) {
    next(error)
  }
})

booksRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user


  if (!req.token || !user._id) {
    return res.status(401).json({ error: 'token expired or invalid' })
  }

  if (body.serviceItem === undefined) {
    return res.status(400).json({ error: 'serviceItem missing' })
  }

  // console.log('ok',body)

  const booking = new Booking({
    bookingDate:body.bookingDate,
    serviceItem: body.serviceItem,
    address:body.address,
    adminComment: body.adminComment,
    user: user._id
  })

  const savedBooking = await booking.save()

  user.bookings = user.bookings.concat(savedBooking.id)
  await user.save()

  res.json(savedBooking)

})

booksRouter.delete('/:id', (req, res, next) => {
  Booking.findOneAndDelete(req.params.id)
    .then((booking) => {
      res.json({message:`Deleted one booking: ${booking.id}`})
    })
    .catch(err => {
      next(err)
    })
})

booksRouter.put('/:id', (req, res, next) => {
  const updateInfo = req.body
  Booking.findByIdAndUpdate(req.params.id,updateInfo )
    .then((booking) => {
      res.json({message:`Updated the booking: ${booking.id}`})
    })
    .catch(err => {
      next(err)
    })
})

module.exports = booksRouter
