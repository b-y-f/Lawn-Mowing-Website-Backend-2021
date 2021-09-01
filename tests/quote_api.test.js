const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Quote = require('../models/quote')

const initialQuotes = [
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

beforeEach(async () => {
  await Quote.deleteMany({})
  let quoteObj = new Quote(initialQuotes[0])
  await quoteObj.save()
  quoteObj = new Quote(initialQuotes[1])
  await quoteObj.save()
})


test('quote return json', async () => {
  await api
    .get('/api/quotes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 50000)

test('all quotes returned', async () => {
  const res = await api.get('/api/quotes')
  expect(res.body).toHaveLength(initialQuotes.length)
})

test('sdsdsds',)



afterAll(() => {
  mongoose.connection.close()
})
