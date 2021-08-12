const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('fail to connect MongoDB', err.message)
  })

const quoteSchema = new mongoose.Schema({
  date: Date,
  serviceItem: [
    {
      item: String,
      unit: Number,
      whatUnit: String,
      pricePerUnit: Number,
      otherComment: String,
      otherCost: Number
    }
  ],
  client: {
    name: String,
    phone: String
  }
})

quoteSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Quote', quoteSchema)
