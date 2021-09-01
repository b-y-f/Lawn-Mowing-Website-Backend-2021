const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  address: String,
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
  ],
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  comment: String
})

bookingSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Booking', bookingSchema)
