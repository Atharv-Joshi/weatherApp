const prequest = require('postman-request')

const forecast = (latitude , longitude , callback) => {
    const url = "http://api.weatherstack.com/current?access_key=5fa40c71d7e256a95574c3afee78702b&query="  + latitude + "," + longitude
    

    prequest(
        {
            url,
            json : true 
        },
        (error , {body}) => {
            if(error){
                callback('Unable to connect to weather services' , undefined)
            }
            else if(body.error){
                callback('Unable to find location' , undefined)
            }
            else{
                callback(undefined , {
                    forecast : body.current.weather_descriptions[0] + '. Temperature : ' + body.current.temperature + ', Feels like :' + body.current.feelslike
                })
            }
        }
    )
}

module.exports = forecast