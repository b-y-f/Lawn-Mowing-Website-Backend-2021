const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  name:String,
  location:String,
  date: { type: Date, default: Date.now },
  hasReplied: {type:Boolean, default: false},
  isUrgent: {type:Boolean, default: false},
  phone: String,
  email: {
    type:String,
    required: [true, 'email required']
  }, 
  serviceItem:[String],
  yardSquare:Number,
  garbageVolumn:Number,
  comment:String,
})

quoteSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Quote', quoteSchema)