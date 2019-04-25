const path = require('path')
const express = require('express');
const hbs = require('hbs');

const app = express()
var publicDirPath = path.join(__dirname, '../public')
var viewPath = path.join(__dirname, '../templates/views')
var partialsPath = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    name : "Ayush Pant"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name : "Ayush Pant"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name : "Ayush Pant"
  })
})

app.get('/weather/', (req, res) => {
  if(!req.query.address) {
     return res.send({
        error: "no address provided"
    })
  } 

  geocode(req.query.address, (error, {longitude, latitude, location})=> {
    if(error) {
      return res.send({
          error
      })
    }

    forecast(longitude, latitude, (error, forecastData)=> {
      if(error){
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })

})

app.get('/products', (req, res) => {
  if(!req.query.name) {
    res.send({
      error: "no parameter provided"
  })
  } else {
    res.send({
      products: req.query
  })
  }
  
})

app.get('*',(req, res)=> {
  res.render('404', {
    title: 'Error Page',
    message : "Oops some error occured"
  })
})

app.listen(3002, () =>{
  console.log('server is running');
});