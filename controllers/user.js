const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
  const body = req.body

  const user = new User({
    name: body.name,
    email: body.email
  })

  await user.save()
    .then(saved => res.json(saved))
    .catch(err => next(err))
})

userRouter.get('/', async (req, res) => {
  const clients = await User.find({}).populate('bookings')

  res.json(clients.map(client => client.toJSON()))
})


// get all bookings for this user
userRouter.get('/:id', async(req,res,next)=>{
  
  try {
    const clients = await User.findById(req.params.id).populate('bookings')
    res.json(clients)
  } catch (error) {
    next(error)
  }
})

// update information for this user
userRouter.put('/:id', async(req,res,next)=>{
  const updateInfo = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,updateInfo)
    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})


module.exports = userRouter
