const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//setting up views path
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')
const publicPath = path.join(__dirname , '../public')

const app = express()
const port = process.env.PORT || 3000
//setting up app properties
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))


//app.get
app.get('' , (req,res)=>{
    res.render('index' , {
        title : 'Weather',
        name : 'atharv J',
    })
})

app.get('/about' , (req , res)=>{
    res.render('about' , {
        title : 'About Me',
        name : 'atharv j'
    })
})

app.get('/help' , (req , res) =>{
    res.render('help' , {
        title : 'Help',
        name : 'atharv j',
        helptext : 'this is some help text'
        
    })
})

app.get('/weather' , (req , res) =>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address , (geocodeError , {latitude , longitude , location} = {} ) => {
        if(geocodeError){
            return res.send({
                error : geocodeError
            })
        }
        forecast(latitude , longitude, (forecastError , forecastData) => {
            if(forecastError){
                return res.send({
                    error : forecastError
                })
            }
            return res.send(
                {
                    location ,
                    forecast : forecastData.forecast,
                    address : req.query.address
                }
            )
        })
    }
    )
})

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        title : '404!',
        errorMessage : 'Help article not found',
        name : 'atharv j'
    })
})

app.get('/*' , (req , res) => {
    res.render('404' , {
        title : '404!',
        errorMessage : 'Page not found',
        name : 'atharv j'
    })
})




app.listen(port , () => {
    console.log('Server is up on port ' + port)
})