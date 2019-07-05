// these functions will work together to get weather informaton for the current location and populate a web page with the data.
'use strict';

// Call the function to get our location
getGeoLocation();


var storage = window.localStorage;
//storage.clear()


// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - bai18023@byui.edu"
    }
  };


// Gets longitude and latitude of current location
function getGeoLocation() {
const status = document.getElementById('status');
status.innerHTML = 'Getting Location...';
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
     const lat = position.coords.latitude;
     const long = position.coords.longitude;
  
     // Combine the values
     const locale = lat + "," + long;
     console.log(`Lat and Long are: ${locale}.`);

     // Call getLocation function, send locale
     getLocation(locale);
  
    })
   } else {
    status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
   } // end else
} 
// end getGeoLocation

// Gets location information from the NWS API
function getLocation(locale) {
 const URL = "https://api.weather.gov/points/" + locale; 
 // NWS User-Agent header (built above) will be the second parameter 
 fetch(URL, idHeader) 
 .then(function(response){
   if(response.ok){ 
    return response.json(); 
   } 
   throw new ERROR('Response not OK.');
 })
 .then(function (data) { 
   // Let's see what we got back
   console.log('Json object from getLocation function:'); 
   console.log(data);
   // Store data to localstorage 
   storage.setItem("locName", data.properties.relativeLocation.properties.city); 
   storage.setItem("locState", data.properties.relativeLocation.properties.state); 

   // Next, get the weather station ID before requesting current conditions 
   // URL for station list is in the data object 
   let stationsURL = data.properties.observationStations; 
   // Call the function to get the list of weather stations
   getStationId(stationsURL); 
  }) 
 .catch(error => console.log('There was a getLocation error: ', error)) 
} 
// end getLocation function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("high", data.properties.maxTemperatureLast24Hours.value); 
      storage.setItem("low", data.properties.minTemperatureLast24Hours.value); 
      storage.setItem("temp", data.properties.temperature.value); 
      storage.setItem("windchill", data.properties.windChill.value); 
      storage.setItem("direction", data.properties.windDirection.value); 
      storage.setItem("windGusts", data.properties.windGust.value); 
      storage.setItem("elevation", data.properties.elevation.value); 
      storage.setItem("windSpeed", data.properties.windSpeed.value); 
   

    //   // Build the page for viewing 

        getHourly();
     }) 

    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function


   function getHourly() { 
    // This is the URL for hourly weather information 
    const URL = "https://api.weather.gov/gridpoints/PIH/125,87/forecast/hourly";
    // NWS User-Agent header (built above) will be the second parameter 

    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getHourly function:'); 
      console.log(data);

      storage.setItem("hr1", data.properties.periods[0].temperature); 
      storage.setItem("hr2", data.properties.periods[1].temperature); 
      storage.setItem("hr3", data.properties.periods[2].temperature); 
      storage.setItem("hr4", data.properties.periods[3].temperature); 
      storage.setItem("hr5", data.properties.periods[4].temperature); 
      storage.setItem("hr6", data.properties.periods[5].temperature);
      storage.setItem("hr7", data.properties.periods[6].temperature); 
      storage.setItem("hr8", data.properties.periods[7].temperature); 
      storage.setItem("hr9", data.properties.periods[8].temperature);
      storage.setItem("hr10", data.properties.periods[9].temperature); 
      storage.setItem("hr11", data.properties.periods[10].temperature); 
      storage.setItem("hr12", data.properties.periods[11].temperature);
      storage.setItem("hr13", data.properties.periods[12].temperature);

        var hourlyList= [];
        var i;
        
    for(i=0; i<13; i++){
        hourlyList+= data.properties.periods[i].temperature+", ";
    }

    storage.setItem("hourList", hourlyList);

    getForecast();

}) 
.catch(error => console.log('There was a getHourly error: ', error)) 
} // end getHourly function



function getForecast() { 
    // This is the URL for getting forecast 
    const URL = "https://api.weather.gov/gridpoints/PIH/125,87/forecast";
    
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getForecast function:'); 
      console.log(data);

      storage.setItem("high", data.properties.periods[0].temperature); 
      storage.setItem("low", data.properties.periods[1].temperature); 

      buildPage();

    }) 
    .catch(error => console.log('There was a getForecast error: ', error)) 
    } // end getForecast function


function buildPage() {


}










