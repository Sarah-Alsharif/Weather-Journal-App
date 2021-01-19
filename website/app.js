// Url , Api key verable 
const apiKey = '&units=metric&appid=1d999ed2beeb55e1f3945cc463eed231';
const url = 'http://api.openweathermap.org/data/2.5/weather?zip=';


//get elements form html using there ID
const zipCode = document.getElementById('zip');
const city = document.getElementById('city');
const icon = document.getElementById('icon');
const date = document.getElementById('date');
const temperature  = document.getElementById('temperature');
const minTemp  = document.getElementById('min-temp');
const maxTemp  = document.getElementById('max-temp');
const description  = document.getElementById('description');
const feeling = document.getElementById('feeling');


/*const temp = document.getElementById('temp');
const date = document.getElementById('date');
const feel = document.getElementById('content');*/



// add eventListener to the botton
document.getElementById('generate').addEventListener('click' , check_zipcode)

// check if the user enter a zip code or not
function check_zipcode(){
  
  if(zipCode.value == '') {
     alert("you shold enter a zipcode");
   console.log("didn't enter a zipcode");
  }
  else
  performAction();
  }


// when user enter a zip code , this function take a zip code and fetch the data
function performAction(){
  //const zipCode= document.getElementById('zip').value;
  const feel = document.getElementById('feel').value;
  const api_url = url+zipCode.value+apiKey;

  //add the full date
  const date = new Date();
  const full_date = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

  // call function getWeatherDemo
  getWeatherDemo(api_url)
  .then(function(data){
   
   postData('/postWeather', {city:data.name ,country:data.sys.country , date:full_date , icon:data.weather[0].icon,
     temp:data.main.temp, minTemp:data.main.temp_min , maxTemp:data.main.temp_max, description:data.weather[0].description,
    feeling:feel});

  })
 .then(getData)
}
 
// function to fetch data form specific url
const getWeatherDemo = async (api_url) => {

    const response = await fetch(api_url);

    try {
          const data = await response.json();
          console.log(data);
          return data;
        }
          catch(error){
          console.log("error" , error)
          }
}

// function to post data to the server side
const postData = async ( url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
         
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        return newData;
      }
      catch(error) {
        console.log("error", error);
        }
         
  }

  // function to update the UI
  
  const getData = async() =>{

    const request = await fetch('/all');

    try {
      const newData = await request.json();
      finel_data = newData[newData.length-1];
      console.log(finel_data);
      city.innerHTML = `${finel_data.city} , ${finel_data.country}`;
      date.innerHTML = `${finel_data.date}`;
      icon.innerHTML = `<img src="icons/${finel_data.iconId}.png"/>`;
      temperature.innerHTML = `${finel_data.temp}°<span>C</span>`;
      minTemp.innerHTML = `${finel_data.minTemp}°<span>C</span>`;
      maxTemp.innerHTML = `${finel_data. maxTemp}°<span>C</span>`;
      description.innerHTML = `${finel_data.description}`;
      feeling.innerHTML = `${finel_data.feeling}`;
    }
   
    catch(error){
      console.log("error" , error)
    }
  }
  