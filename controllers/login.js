const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Client = require('../models/client')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  const client = await Client.findOne({ username: body.username })
  const passwordCorrect = client === null
    ? false
    : await bcrypt.compare(body.password, client.passwordHash)

  if (!(client && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const clientToken = {
    username: client.username,
    id: client._id
  }

  // TODO token expire with 1 hour
  const token = jwt.sign(clientToken, process.env.SECRET)

  res.status(200).send({ token, username: client.username, name: client.name ,id: client._id})
})

module.exports = loginRouter
