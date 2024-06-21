const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+address+'&access_token=pk.eyJ1IjoiZGpheS1uZWplIiwiYSI6ImNseGE4Ymk1aTFrZmcyaXIwa3QyeGlqbDAifQ.nEFKxh0oQNVP6pEByWOi0Q&limit=1'
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to get geocoding service!');
        }else if(body.features.length === 0){
            callback('Something went wrong!');
        }else{
            const {longitude,latitude} = body.features[0].properties.coordinates
            const {full_address} = body.features[0].properties
            callback(undefined,{
                'longitude':longitude,
                'latitude' :latitude,
                'location' : full_address
            })
        }
    })
}

module.exports = geoCode