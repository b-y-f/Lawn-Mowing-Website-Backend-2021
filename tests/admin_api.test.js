const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Admin = require('../models/admin')

// const auth = (token) => {
//   return {
//     Authorization: 'bearer ' + token
//   }
// }

const testAdmin = {
  username:'admin',
  password:'admin'
}

beforeEach(async () => {
  await Admin.deleteMany({})
})

describe('admin login' , ()=>{
  test('create a admin account',async()=>{
    const res = await api.post('/api/admin/register').send(testAdmin)
    expect(res.status).toBe(200)
    console.log(res.body)
  })

  test('login without register',async()=>{
    const res = await api.post('/api/admin/login').send(testAdmin)
    expect(res.status).toBe(401)
    expect(res.body.error).toContain('invalid')
  })

  test('login and get a token for security',async()=>{

    await api.post('/api/admin/register').send(testAdmin)

    await api.get('/api/admin/users')
    const res = await api.post('/api/admin/login').send(testAdmin)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })
})




afterAll(() => {
  mongoose.connection.close()
})
