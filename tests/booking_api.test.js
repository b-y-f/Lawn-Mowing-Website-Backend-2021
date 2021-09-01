const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Booking = require('../models/booking')
const Client = require('../models/client')

const initialBookings = [
  {
    address: '123 rd',
    serviceItem: [
      {
        'item': 'LawnMow',
        'unit': 23,
        'whatUnit': 'Hours',
        'pricePerUnit': 12,
        'otherComment': 'Very tough evn plug $20',
        'otherCost': 20
      }
    ],
    comment: 'test!!!!!!'
  },
  {
    address: '456 rd',
    serviceItem: [
      {
        'item': 'Others',
        'unit': 23,
      }
    ],
  }
]

const initialClient = {
  username: 'byf',
  password: 'byf',
  name: 'linux'
}

beforeEach(async () => {
  await Booking.deleteMany({})
  await Client.deleteMany({})

  let bookingObj = new Booking(initialBookings[0])
  await bookingObj.save()
  bookingObj = new Booking(initialBookings[1])
  await bookingObj.save()


})


test('a quote can be added and returned by a client with valid token', async () => {
  await api
    .get('/api/bookings')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/bookings')
  expect(res.body).toHaveLength(initialBookings.length)

  const addresses = res.body.map(i => i.address)
  expect(addresses).toContain('123 rd')
  expect(addresses).not.toContain('--- rd')

}, 50000)


test('add user--> login --> post with token', async () => {

  const resUser = await api.post('/api/clients')
    .send(initialClient)
  expect(resUser.body.name).toContain('linux')

  const resLogin = await api.post('/api/login')
    .send({ username: 'byf', password: 'byf' })
  expect(resLogin.body).toHaveProperty('token')

  const auth = {
    Authorization: 'bearer ' + resLogin.body.token
  }
  const resBooking = await api.post('/api/bookings')
    .set(auth)
    .send(initialBookings[0])
  console.log(resBooking.body.client);
  expect(resBooking.body).toHaveProperty('comment')

}, 50000)

test('will return "token expired or invalid" when no token', async () => {
  const resBooking = await api.post('/api/bookings')
    .send(initialBookings[1])
  expect(resBooking.body.error).toContain('token expired')
})


afterAll(() => {
  mongoose.connection.close()
})
