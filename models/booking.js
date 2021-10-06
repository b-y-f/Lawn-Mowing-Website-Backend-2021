const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  created: { type: Date, default: Date.now },
  address: String,
  bookingDate: Date,
  rating:{ type: Number, default: 3 },
  status: {type:String, default:'pending'},
  serviceItem: [
    {
      item: String,
      serviceComment: String,
    }
  ],
  worker:String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminComment: String
})

bookingSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Booking', bookingSchema)
