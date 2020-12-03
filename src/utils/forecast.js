const request= require('request');

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=dafb4cd43b16917fefbc8e8c88e5db1d&query=' + longitude + "," + latitude + '&units=f';

    request({url:url, json:true},(error,Response) => {  
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(Response.body.error){
            callback('Unable to find location.',undefined)
        }else{
         callback(undefined,Response.body.current);
        }
     })
}

module.exports=forecast;