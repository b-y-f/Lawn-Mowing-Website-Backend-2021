const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


const dummyUser = {email:'1231@123.com',name:'yifan bill'}
const dummyUpdateUserPhone = {email:'1231@123.com',name:'Dummy bill',phone:'223-232-2333', address:'123 new land'}

// const User = require('../models/user')
// beforeEach(async () => {
//   await User.deleteMany({})
// })
describe('After signin, email and name will be send to my moogoDB', ()=>{

  test('check users', async()=>{
    const res=await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    console.log(res.body)
  })

  test('create new user..', async()=>{
    const res = await api.post('/api/users').auth('tobi', 'learnboost').send(dummyUser)
    console.log(res.body)
  })

  test('Update user informations', async()=>{
    const res = await api.put('/api/users/614c92fc448e3640482e0e68').send(dummyUpdateUserPhone)
    console.log(res.body)
  })

})



afterAll(() => {
  mongoose.connection.close()
})