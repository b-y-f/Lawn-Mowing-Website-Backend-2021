const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Booking = require('../models/booking')
const User = require('../models/user')

// 1 hour refresh
const TOKEN =process.env.FIRE_TOKEN

const dummyBooking = {
  bookingDate:new Date(),
  address: '123 rd',
  serviceItem: [
    {
      'item': 'LawnMow',
      'serviceComment':'Jamse',
      'worker':'jims'
    }
  ],
  adminComment: 'admin commment test!!!!!!'
}

const dummyBooking2 = {
  bookingDate:new Date(),
  address: '456 rd',
  serviceItem: [
    {
      'item': 'ZZZ',
      'serviceComment':'Good!!!',
      'worker':'bills'
    }
  ],
  adminComment: 'admin commment test!!!!!!'
}

const dummyUser = {email:'321@321.com',name:'yifan bill'}

const auth = (token) => {
  return {
    Authorization: 'bearer ' + token
  }
}


beforeEach(async () => {
  await Booking.deleteMany({})
  await User.deleteMany({})

  let user = new User(dummyUser)
  await user.save()
})


describe('create new booking', ()=>{
  test('watch user', async()=>{
    const res= await api
      .get('/api/users')
      .set(auth(TOKEN))
      
    console.log(res.body)
  })

  test('create two new booking with one user token', async()=>{
    const res = await api
      .post('/api/bookings')
      .set(auth(TOKEN))
      .send(dummyBooking)

    const res2 = await api
      .post('/api/bookings')
      .set(auth(TOKEN))
      .send(dummyBooking2)

    const res3 = await api.get('/api/bookings').set(auth(TOKEN))

    const res4 = await api.get('/api/users').set(auth(TOKEN))
      

    // console.log(res4.body)
    console.log(res3.body)

  },10000)
})

describe('update', ()=>{

  test('delete booking', async()=>{
    const bookingRes = await api
      .post('/api/bookings')
      .set(auth(TOKEN))
      .send(dummyBooking)

    const bookingId = bookingRes.body.id
    // console.log(bookingId)
    const delRes = await api.delete(`/api/bookings/${bookingId}`)
    console.log(delRes.body)
    const watchBookings = await api.get('/api/bookings')
    console.log(watchBookings.body)
  })

  test('update booking info', async()=>{
    const bookingRes = await api
      .post('/api/bookings')
      .set(auth(TOKEN))
      .send(dummyBooking)

    // const watch0 = await api.get('/api/bookings')

    const bookingId = bookingRes.body.id

    const dummyUpdateBooking = {
      bookingDate:new Date(),
      address: 'adress updated',
      status:'approved',
      serviceItem: [
        {
          'item': 'updated',
          'serviceComment':'Good!!!',
          'worker':'test'
        }
      ],
      adminComment: 'admin commment updated!!!!'
    }

    await api
      .put(`/api/bookings/${bookingId}`)
      .set(auth(TOKEN))
      .send(dummyUpdateBooking)

    const watch = await api.get('/api/bookings')

    console.log('updated:',watch.body)
  })


})



afterAll(() => {
  mongoose.connection.close()
})
