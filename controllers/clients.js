const bcrypt = require('bcrypt')
const clientsRouter = require('express').Router()
const Client = require('../models/client')

clientsRouter.post('/', async (req, res, next) => {
  const body = req.body

  const saltRound = 10
  const passwordHash = await bcrypt.hash(body.password, saltRound)

  const client = new Client({
    username: body.username,
    name: body.name,
    passwordHash,
    phone: body.phone,
    email: body.email
  })

  await client.save()
    .then(saved => res.json(saved))
    .catch(err => next(err))
})

clientsRouter.get('/', async (req, res) => {
  const clients = await Client.find({}).populate('quotes')

  res.json(clients.map(client => client.toJSON()))
})

module.exports = clientsRouter
