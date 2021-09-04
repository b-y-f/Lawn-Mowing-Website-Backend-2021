const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
  name:String,
  location:String,
  date: { type: Date, default: Date.now },
  hasSent: {type:Boolean, default: false},
  isUrgent: {type:Boolean, default: false},
  phone:{
    type:String,
    validate:{
      validator: v=>{
        return /\d{3}(-|\s)\d{3}(-|\s)\d{4}/.test(v) 
      },
      message: props => `${props.value} is not a valid phone number! ipnut xxx xxx xxxx OR xxx-xxx-xxxx`
    },
    required: [true, 'phone required']
  },
  email: {
    type:String,
    required: [true, 'email required']
  },
  extraInfo:String,
  important: Boolean,
  serviceItem:[{
    item: String,
    unit: {
      type: Number,
      default: 0
    },
    whatUnit: String,
    otherComment: String,
  }]
})

quoteSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

module.exports = mongoose.model('Quote', quoteSchema)
