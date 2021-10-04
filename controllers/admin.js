const bcrypt = require('bcrypt')
const adminRouter = require('express').Router()
const Admin = require('../models/admin')

// only for test 
adminRouter.get('/users',async(req,res)=>{
  const users = await Admin.find({})
  res.json(users)
})

adminRouter.post('/register', async(req,res,next)=>{
  const body = req.body

  const saltRound = 10
  const passwordHash = await bcrypt.hash(body.password, saltRound)

  const admin = new Admin({
    username: body.username,
    passwordHash,
  })

  try {
    await admin.save()
    res.json({message:'Nice, admin added'})
  } catch (error) {
    next(error)
  }
})

module.exports = adminRouter
