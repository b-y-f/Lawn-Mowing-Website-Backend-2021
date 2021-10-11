const booksRouter = require('express').Router()
const Booking = require('../models/booking')


booksRouter.get('/',async(req,res,next)=>{
  try {
    const allBookings = await Booking.find({}).populate('user')
    res.json(allBookings)
  } catch (error) {
    next(error)
  }
})
// specific booking 
booksRouter.get('/:id', async (req, res, next) => {

  try {
    const bookings = await Booking.findById(req.params.id)
    res.json(bookings)
  } catch (error) {
    next(error)
  }
})

// add ad booking
booksRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user
  if (body.serviceItem === undefined) {
    return res.status(400).json({ error: 'serviceItem missing' })
  }

  // console.log('ok',body)

  console.log('user watch',user)

  const booking = new Booking({
    bookingDate:body.bookingDate,
    serviceItem: body.serviceItem,
    address:body.address,
    adminComment: body.adminComment,
    bookingNote:body.bookingNote,
    user: user._id
  })

  const savedBooking = await booking.save()

  user.bookings = user.bookings.concat(savedBooking.id)
  await user.save()

  res.json(savedBooking)
})

booksRouter.delete('/:id', (req, res, next) => {

  Booking.findByIdAndDelete(req.params.id)
    .then(() => {
      // console.log(booking)
      res.json({message:'Removed booking success'})  
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
