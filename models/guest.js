const mongoose = require('mongoose')

const guestSchema = mongoose.Schema({

  name: String,
  address: String,
  phone: String,
  email: String,
  quotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quote'
    }
  ]
})

guestSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest
