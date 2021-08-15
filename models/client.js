const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const clientSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  name: String,
  address: String,
  phone: String,
  email: String,
  passwordHash: String,
  quotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote'
    }
  ]
})

clientSchema.plugin(uniqueValidator)

clientSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client
