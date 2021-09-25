const userRouter = require('express').Router()
const User = require('../models/user')

// this one is used for first time signup then 
// I can match email address 
userRouter.post('/', async (req, res, next) => {
  const body = req.body

  const user = new User({
    uid:body.uid,
    email:body.email,
    phone:body.phone,
    firstName: body.firstName,
    lastName:body.lastName,
    photoURL:body.photoURL
  })

  await user.save()
    .then(saved => res.json(saved))
    .catch(err => next(err))
})

// get all bookings for this user
userRouter.get('/', async(req,res,next)=>{

  // console.log(req.token)
  try {
    console.log(req.user)
    const user = await User
      .findById(req.user._id)
      .populate('bookings')

    res.json(user)
  } catch (error) {
    next(error)
  }
})

// update information for this user
userRouter.put('/', async(req,res,next)=>{
  const updateInfo = req.body

  try {
    const updatedUser = await User.findOneAndUpdate(req.user_id,updateInfo)
    res.json(updatedUser)
    console.log(updatedUser)

  } catch (error) {
    next(error)
  }
})


module.exports = userRouter
