const quotesRouter = require('express').Router()
const Quote = require('../models/quote')

quotesRouter.get('/',async(req,res,next)=>{
  try {
    const quotes = await Quote.find({})
    return res.json(quotes)
  } catch (error) {
    next(error)
  }
})

quotesRouter.post('/', async(req,res,next)=>{
  try {
    const body = req.body
    const newQuote = new Quote(body) 
    const resQuote= await newQuote.save()
    return res.json(resQuote)
  } catch (error) {
    next(error)
  }
})



module.exports = quotesRouter
