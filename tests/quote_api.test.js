const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Quote = require('../models/quote')
const Client = require('../models/client')

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

const initialClient = {
  username: 'byf',
  password: 'byf',
  name: 'linux'
}

beforeEach(async () => {
  await Quote.deleteMany({})
  await Client.deleteMany({})

  let quoteObj = new Quote(initialQuotes[0])
  await quoteObj.save()
  quoteObj = new Quote(initialQuotes[1])
  await quoteObj.save()


})


test('a quote can be added and returned by a client with valid token', async () => {
  await api
    .get('/api/quotes')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/quotes')
  expect(res.body).toHaveLength(initialQuotes.length)

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
  const resQuote = await api.post('/api/quotes')
    .set(auth)
    .send(initialQuotes[0])
  console.log(resQuote.body.client);
  expect(resQuote.body).toHaveProperty('comment')

}, 50000)


afterAll(() => {
  mongoose.connection.close()
})
