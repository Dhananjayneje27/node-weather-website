const request = require('postman-request')

const forecast = (longitude,latitude,callback)=>{
    console.log(longitude,latitude);
    // latitude = 40.7831;
    // longitude = -73.9712;
    const url = 'http://api.weatherstack.com/current?access_key=6ba6395628127a50c3982ccd638c0f7f&query='+ latitude +',' + longitude
    console.log(url)
    request({url,json:true},(error,{body}={})=>{
        console.log(body);
        if(error){
            callback('Error in fetching the weather data!',undefined)
        }else if(body.error){
            callback('Error!',undefined)
        }else{
            const {weather_descriptions,temperature,precip,humidity,feelslike} = body.current
            callback(undefined,weather_descriptions+'. It is currently '+ temperature + ' degrees out. It feels like '+feelslike+' degrees out. The humidity is '+humidity+'%. There is a '+ precip + '% chance of rain.')
        }
    })
}
//response.body.current.weather_descriptions+'. It is currently '+ response.body.current.temperature + ' degrees out. There is a '+ response.body.current.precip + '% chance of rain.'
module.exports = forecast