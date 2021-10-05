'use strict'

require('dotenv').config({ path: './var.env' })
const connectToDatabase = require('./db')
const Booking = require('./booking.model')

const headers = {
  'Access-Control-Allow-Origin': '/path:*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
}

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false
  connectToDatabase().then(() => {
    Booking.create(JSON.parse(event.body))
      .then(b =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(b),
          headers
        })
      )
      .catch(err =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: `Could not create  reason: ${err}`
        })
      )
  })
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Booking.findById(event.pathParameters.id)
        .then(b => callback(null, {
          statusCode: 200,
          body: JSON.stringify(b),
          headers
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the booking.'
        }))
    })
}

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Booking.find()
        .then(b => callback(null, {
          statusCode: 200,
          body: JSON.stringify(b),
          headers
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the bookings.'
        }))
    })
}

// TODO allow admin change statues
module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Booking.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(b => callback(null, {
          statusCode: 200,
          body: JSON.stringify(b),
          headers
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the bookings.'
        }))
    })
}

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  connectToDatabase()
    .then(() => {
      Booking.findByIdAndRemove(event.pathParameters.id)
        .then(quote => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed booking with id: ' + quote.id, quote: quote }),
          headers
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch quote.'
        }))
    })
}
