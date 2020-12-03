const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibWF5YW5rMDAyMiIsImEiOiJja2hzcWg2cHowdmdqMnhwYjFxbWg3NTBiIn0.yrcYMAQH0u4MQ2riHKRxmA&limit=1";

    request({url:url, json:true},(error,Response) => {  
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(Response.body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined, {
                 latitude: Response.body.features[0].center[1],
                 longitude: Response.body.features[0].center[0],
                 location: Response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;