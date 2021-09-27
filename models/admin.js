const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  username:String,
  passwordHash: String,
})

adminSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Admin', adminSchema)
