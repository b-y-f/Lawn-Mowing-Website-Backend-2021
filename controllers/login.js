// NO need save passwork in my database since used firebase, 
// also token expire can be confire in firebase
// Only user basic information is stored in my DB


// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
// const loginRouter = require('express').Router()
// const Client = require('../models/user')

// loginRouter.post('/', async (req, res) => {
//   const body = req.body
//   const client = await Client.findOne({ username: body.username })
//   const passwordCorrect = client === null
//     ? false
//     : await bcrypt.compare(body.password, client.passwordHash)

//   if (!(client && passwordCorrect)) {
//     return res.status(401).json({
//       error: 'invalid username or password'
//     })
//   }

//   const clientToken = {
//     username: client.username,
//     id: client._id
//   }

//   // TODO token expire with 1 hour
//   const token = jwt.sign(clientToken, process.env.SECRET) 

//   res.status(200).send({ token, username: client.username, name: client.name })
// })

// module.exports = loginRouter
