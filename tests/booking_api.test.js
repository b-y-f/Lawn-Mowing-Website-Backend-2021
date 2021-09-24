const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Booking = require('../models/booking')
const User = require('../models/user')

const initialBookings = [
  {
    bookingDate:new Date(),
    address: '123 rd',
    serviceItem: [
      {
        'item': 'LawnMow',
        'serviceComment':'Jamse',
        'worker':'jims'
      }
    ],
    comment: 'test!!!!!!'
  },
  {
    address: '456 rd',
    serviceItem: [
      {
        'item': 'Others',
      }
    ],
  }
]

const initialClient = {
  email: 'byf@123.com',
  name: 'linux'
}

const clientA =  {
  email: 'clientA@123.com',
  name: 'cA'
}

const auth = (token) => {
  return {
    Authorization: 'bearer ' + token
  }
}

beforeEach(async () => {
  await Booking.deleteMany({})
  await User.deleteMany({})

  let bookingObj = new Booking(initialBookings[0])
  await bookingObj.save()
  bookingObj = new Booking(initialBookings[1])
  await bookingObj.save()
})

// TODO rework
describe('all related to add a booking', ()=>{

  // test('check token when create new booking', async()=>{
  //   await 
  // })

  test('a booking can be added and returned by a client with valid token', async () => {
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

  test('create a client', async()=>{
    const resUser = await api.post('/api/users')
      .send(initialClient)
    expect(resUser.body.name).toContain('linux')
    const getAllClients = await api.get('/api/users')
    expect(getAllClients.body).toHaveLength(1)
  })

  
  test('will return "token expired or invalid" when no token', async () => {
    const resBooking = await api.post('/api/bookings')
      .send(initialBookings[1])
    expect(resBooking.body.error).toContain('token expired')
  })
})

describe('retrieve bookings from server ',()=>{
  test('get all bookings for a specific client, only with token',async()=>{

    const user = await api.post('/api/users')
      .send(clientA)
    const userId = user.body.id

    const resLogin = await api.post('/api/login')
      .send({ username: 'clientA', password: 'clientA' })
    const token=resLogin.body.token

    let res = await api.get(`/api/users/${userId}`)
    let clients = res.body
    expect(clients).toHaveProperty('name')
    expect(clients.bookings).toHaveLength(0)

    // add one booking
    await api.post('/api/bookings')
      .set(auth(token))
      .send(initialBookings[0])
    res = await api.get(`/api/users/${userId}`)
    clients = res.body
    expect(clients.bookings).toHaveLength(1)
    
    await api.post('/api/bookings')
      .set(auth(token))
      .send(initialBookings[1])
    res = await api.get(`/api/users/${userId}`)
    clients = res.body
    console.log(clients.bookings)
    expect(clients.bookings).toHaveLength(2)
    
  },100000)
})



afterAll(() => {
  mongoose.connection.close()
})
