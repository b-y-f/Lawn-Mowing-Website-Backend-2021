const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Quote = require('../models/quote')


const initQuotes = [{
  name:'yifan bao',
  location:'123 queen st',
  phone:'123-234-4567',
  email: '555@qq.com',
  extraInfo:'hello',
  important: false,
  serviceItem:{
    item: 'lawn mowing',
    unit: 100,
    whatUnit: 'squre',
    otherComment: '',
  }
},
]

beforeEach(async () => {
  await Quote.deleteMany({})
})

describe('Quote from user', ()=>{
  test('get quotes as json', async()=>{
    await api.get('/api/quotes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('add init quote', async()=>{
    const quotes = await api.post('/api/quotes')
      .send(initQuotes[0])
    expect(quotes.body).toHaveProperty('name')
  })

  test('add quote without correct phone number', async()=>{
    const quotes = await api.post('/api/quotes')
      .send({...initQuotes[0],phone:'123'})
    expect(quotes.body.error).toContain('not a valid phone')
  })

  test('missing phone or email not allowed..', async()=>{
    const quotes = await api.post('/api/quotes')
      .send({...initQuotes[0],phone:null, email:null})
    expect(quotes.body.error).toContain('required')
  })

  test('add two quotes', async()=>{
    await api.post('/api/quotes').send({...initQuotes[0], name:'youtub', phone:'022-213-0088', email:'555@qq.com'})
    const quotes = await api.get('/api/quotes')
    expect(quotes.body).toHaveLength(1)
    await api.post('/api/quotes').send(initQuotes[0])
    const quotes2 = await api.get('/api/quotes')
    expect(quotes2.body).toHaveLength(2)

  })


})



afterAll(() => {
  mongoose.connection.close()
})
