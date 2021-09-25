const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

// email can only be changed by front-end firebase auth...
// also email should be unique since it was used for find
const dummyUser = {email:'444@444.com',name:'yifan bill',uid: 'pvfRwAcDc5dhHXPvQgEH4AGN1fv2'}
const dummyUpdateUserPhone = {name:'Dummy bill',phone:'223-232-2333', address:'123 new land'}

const TOKEN = process.env.FIRE_TOKEN

const auth = (token) => {
  return {
    Authorization: 'bearer ' + token
  }
}
beforeEach(async () => {
  await User.deleteMany({})
  let user = new User(dummyUser)
  await user.save()
})
describe('After signin, email and name will be send to my moogoDB', ()=>{

  test('check users', async()=>{
    const res = await api
      .get('/api/users')
      .set(auth(TOKEN))
      .expect(200)

    console.log(res.body)
  })

  test('new create user', async()=>{
    const res = await api
      .post('/api/users')
      .set(auth(TOKEN))
      .send(dummyUser)

    console.log(res.body)
  })

  test('Update user informations with a token', async()=>{
    const res = await api
      .put('/api/users')
      .set(auth(TOKEN))
      .send(dummyUpdateUserPhone)

    const updated = await api
      .get('/api/users')
      .set(auth(TOKEN))
      
    console.log(updated.body)
  })

})

afterAll(() => {
  mongoose.connection.close()
})