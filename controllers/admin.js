const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const adminRouter = require('express').Router()
const Admin = require('../models/admin')

// only for test 
adminRouter.get('/users',async(req,res)=>{
  const users = await Admin.find({})
  res.json(users)
})

adminRouter.post('/login', async (req, res) => {
  const body = req.body
  const admin = await Admin.findOne({ username: body.username })
  const passwordCorrect = admin === null
    ? false
    : await bcrypt.compare(body.password, admin.passwordHash)

  if (!(admin && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const adminToken = {
    username: admin.username,
    id: admin._id
  }

  const token = jwt.sign(adminToken, process.env.SECRET)

  res.status(200).send({ token })
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
