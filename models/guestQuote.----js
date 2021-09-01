const mongoose = require('mongoose')

const guestSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  name: String,
  address: String,
  phone: String,
  email: String,
  serviceItem: [
    {
      item: String,
      unit: {
        type: Number,
        default: 0
      },
      whatUnit: String,
      pricePerUnit: Number,
      otherComment: String,
      otherCost: Number
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
