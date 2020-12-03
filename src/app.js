const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title:"Weather App",
        name: "Mayank"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"Weather",
        name: "Mayank"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:"Weather App",
        name: "Mayank"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'please provide an address'
        })
    }
    geocode(req.query.address, (error, data={}) => {
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(data.longitude, data.latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast_Temperature: forecastData.temperature,
                forecast_Feels:forecastData.feelslike,
                location: data.location,
                address: req.query.address
            })
            // console.log("The location is " + data.location)
            // console.log('The temperature is ' + forecastData.temperature + ' and feels like ' + forecastData.feelslike + ".")
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Mayank',
        errorMessage:'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Mayank',
        errorMessage:'this is 404 page'
    })
})

 app.listen(3000, () => {
     console.log('Server is up on port 3000.')
 })