const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

console.log(__dirname)

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars for engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static derectory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
 res.render('index',{
    title:'Weather Page',
    name: 'Djay Neje'
 })
})

app.get('/help',(req,res)=>{
    res.render('help',{
       title:'This is Help page',
       name: 'Aaryan Suryawanshi'
    })
   })

app.get('/about',(req,res)=>{
    res.render('about',{
       title:'This is about page',
       name: 'Prachi Thakur'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        console.log('Please provide address!')
    }else{
        geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
               return res.send({error})
            }
            forecast(longitude,latitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                 }
                 res.send({
                    location: location,
                    forecastData: forecastData
                 })
            })
        })
    }
    // if(!req.query.address){
    //     return res.send({ 
    //         address: 'You must provide address!',
    //     })
    // }
    // // const lat_long_data = geoCode('req.query.address')
    // // console.log(lat_long_data);
    // const forcastData = forecast('-73.9712','40.7831')
    // // forecast(lat_long_data.longitude,lat_long_data.latutude)
    // res.send({
    //     forecast:forcastData.weather_descriptions,
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name: 'Djay Neje',
        errormsg:'Help article not found'
     })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        name: 'Prachi Thakur',
        errormsg:'Page not found'
     })
})


// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// Start the server and add error handling
const port = 3000
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err)
    } else {
        console.log(`Server is started on port ${port}`)
    }
})