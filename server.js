
// Require Express to run server and routes
const express = require('express');
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// create a port
const port = 3000;
const server = app.listen(port, ()=> {
    console.log(`server listen on port ${port}`);
})


// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// get request to send data to the client side
app.get('/all' , (req,res)=>{
  res.send(projectData);
})

// post request to get the data from client side
app.post('/postWeather' , watherData);

function watherData(req,res){

  const data = req.body;

  const newEntry = {
    city: data.city,
    country: data.country,
    date : data.date,
    iconId : data.icon,
    temp : data.temp,
    minTemp : data.minTemp,
    maxTemp : data.maxTemp,
    description : data.description,
    feeling: data.feeling,
   
  };

  projectData.push(newEntry)
  res.send(projectData);
  console.log(projectData);

}