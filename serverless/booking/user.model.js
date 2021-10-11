const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  uid:String,
  firstName: String,
  lastName: String,
  address: String,
  phone: String,
  photoURL:String,
  email: {type:String, unique:true},
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    delete returnedObj.__v
    // delete returnedObj.passwordHash
  }
})


module.exports = mongoose.model('User', userSchema)
