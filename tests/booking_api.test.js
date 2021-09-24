const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Booking = require('../models/booking')
const User = require('../models/user')

// 1 hour refresh
const TOKEN ='eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNTJiOGQ4NTk4N2U1OWRjYWM2MmJlNzg2YzcwZTAyMDcxN2I0MTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0aC1kZXYtNTNjOWIiLCJhdWQiOiJhdXRoLWRldi01M2M5YiIsImF1dGhfdGltZSI6MTYzMjQ0NTM5NSwidXNlcl9pZCI6ImRmTkx2MVdRMVVaRUw3MW5KMUpsRlhybm5pbzIiLCJzdWIiOiJkZk5MdjFXUTFVWkVMNzFuSjFKbEZYcm5uaW8yIiwiaWF0IjoxNjMyNDU3MDM3LCJleHAiOjE2MzI0NjA2MzcsImVtYWlsIjoiMTIzQDEyMy5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiMTIzQDEyMy5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.kMMsRmzH4LKXw_Np4Ka3qiIRNJBEYsEXe-ayDf2WWbcX13JWiI9dxDuIwuITNtLfow-vuDSO5r9pJ0fRcpqQc5ZYXfbbliZT6IUENLl6_vStgbiY0bC6sOlchdbYN1sHT8g-nGtxiJR1X0xMMUbtsp0WN1ih9gLAOAjipvM7YMmDOnde4hh7wekhY3mCmLZJdy1NKbUyqfEclGNJG84mWrBDCHiyifQOl9A7Pg4eZE0bVVHaQJylQMuDk-LzIY8SPMmpS8vqEfN8ldZmMKmYspO7IV6rqYfxzIWNwHlMosk9IFzdP9rJXbAliH1Q6zXtZF165XE7Lw3HO1KXH6v_pw'

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

const dummyUser = {
  email:'123@123.com',
  name:'dummy222'
}

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

    const res3 = await api.get('/api/bookings')

    const res4 = await api.get('/api/users')
      

    console.log(res3.body,res4.body)

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
      .send(dummyUpdateBooking)

    const watch = await api.get('/api/bookings')

    console.log('updated',watch.body)
  })


})



afterAll(() => {
  mongoose.connection.close()
})
