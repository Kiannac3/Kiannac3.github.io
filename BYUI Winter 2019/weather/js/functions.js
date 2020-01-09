var storage = window.localStorage;
//storage.clear()


// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - bai18023@byui.edu"
    }
  };


// let speed = document.getElementById('currWind');
// let temp = document.getElementById('currTemp');


// console.log(`speed is ${speed}`);
// console.log(`temp is ${temp}`);

//buildWC(speed, temp);
// Calculate the Windchill
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
   
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
   
    // Round the answer down to integer
    wc = Math.floor(wc);
   
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
   
    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
    }



// Wind Dial Function
function windDial(direction){
    // Get the wind dial container
    const dial = document.getElementById("dial");
     // Determine the dial class
 switch (direction){
    case "North":
    case "N":
     dial.setAttribute("class", "n"); //"n" is the CSS rule selector
     break;
    case "NE":
    case "NNE":
    case "ENE":
     dial.setAttribute("class", "ne");
     break;
    case "NW":
    case "NNW":
    case "WNW":
     dial.setAttribute("class", "nw");
     break;
    case "South":
    case "S":
     dial.setAttribute("class", "s");
     break;
    case "SE":
    case "SSE":
    case "ESE":
     dial.setAttribute("class", "se");
     break;
    case "SW":
    case "SSW":
    case "WSW":
     dial.setAttribute("class", "sw");
     break;
    case "East":
    case "E":
     dial.setAttribute("class", "e");
     break;
    case "West":
    case "W":
     dial.setAttribute("class", "w");
     break;
 }
}

//Call functions
// const weatherCondition = "rain"; //Set your own value
// let weather = getCondition(weatherCondition);
// changeSummaryImage(weather);


//Determine what the value is.
function getCondition(weatherCondition){
    if (weatherCondition.includes ("Clear") || weatherCondition.includes("Sunny")) {
        return "clear";
    }
    else if (weatherCondition.includes("Rain") || weatherCondition.includes("Thunderstorms")){
        return "rain";
    }
    else if (weatherCondition.includes("Cloudy") || weatherCondition.includes("Partly Cloudy")) {
        return "cloudy";
    }
    else if (weatherCondition.includes("Fog")){
        return "fog";
    }
    else {
        return "snow";
    }
}

//Change class according to the value
function changeSummaryImage(weatherCondition){
    const largeframe = document.getElementById("largeframe");
    const smallFrame = document.getElementById("smallFrame");
console.log(weatherCondition);
    switch(weatherCondition){
        case "clear":
        largeframe.setAttribute("class", "clear");
        smallFrame.setAttribute("class", "clear");
        break;
        case "rain":
        largeframe.setAttribute("class", "rain");
        smallFrame.setAttribute("class", "rain");
        break;
        case "cloudy":
        largeframe.setAttribute("class", "cloud");
        smallFrame.setAttribute("class", "cloud");
        break;
        case  "fog":
        largeframe.setAttribute("class", "fog");
        smallFrame.setAttribute("class", "fog");
        break;
        case "snow":
        largeframe.setAttribute("class", "snow");
        smallFrame.setAttribute("class", "snow");
        break;

    }
}


    // Convert meters to feet

    // let meters = document.getElementById('meters');
    // let meters = 1514.246;
    // let feet = meterstoFeet(meters);
    // let elevation = document.getElementById("elevation");
    // elevation.innerHTML = feet;

    function meterstoFeet(meters){
        //calculate meters to feet
        let f = meters * 0.3048;
        console.log(f);
        // round to nearest integer
        f = Math.floor(f);
        return f.toFixed(2);
    }


// Get the next hour based on the current time
//These are the variables for the function
let date = new Date(); 
let nextHour = date.getHours() + 1;
let hourlyListItems;
let hourlyTemps;

//call functions


    // Convert, Format time to 12 hour format
function format_time(hour) {
    if(hour > 23){ 
        hour -= 24; 
       } 
       let amPM = (hour > 11) ? "pm" : "am"; 
       if(hour > 12) { 
        hour -= 12; 
       } 
       if(hour == 0) { 
        hour = "12"; 
       } 
       return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 175 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }

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
         storage.setItem("windChill", data.properties.windChill.value); 
        //  storage.setItem("direction", data.properties.windDirection.value); 
         
         storage.setItem("elevation", data.properties.elevation.value); 
         storage.setItem("windSpeed", data.properties.windSpeed.value); 
         storage.setItem("temp", data.properties.temperature.value);
         
      
   
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
   
   
           var hourlyList= [];
           var i;
           
       for(i=0; i<13; i++){
           hourlyList[i] = data.properties.periods[i].temperature;
       }
        let hour = buildHourlyData(nextHour, hourlyList); 
        console.log(hour);
        console.log(hourlyList);

       storage.setItem("hourList", hour);
   
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
         storage.setItem("winddirection", data.properties.periods["0"].windDirection);
        storage.setItem("windGust", data.properties.periods["0"].windSpeed); 
         buildPage();
   
       }) 
       .catch(error => console.log('There was a getForecast error: ', error)) 
       } // end getForecast function

  // Populate the current location weather page

  // function windNumbers(direction) {
  //   if (direction > 16 && direction <= 75) {
  //       direction = "ne";
  //       }
  //       else if (direction > 76 && direction <= 125){
  //       direction = "e";
  //       }
  //       else if (direction > 126 && direction  <= 155) {
  //       direction = "se";
  //       }
  //       else if (direction > 156 && direction <= 195) {
  //         direction = "s";
  //         }
  //         else if (direction > 196 && direction <= 250){
  //         direction = "sw";
  //         }
  //         else if (direction > 251 && direction <= 280) {
  //         direction = "w";
  //         }
  //         else if (direction > 281 && direction <= 320){
  //           direction = "nw";
  //           }
  //           else {
  //           direction = "n";
  //           }
  //           return direction;   
  //   }

  function convert(temp) { 
    let fahr = temp* 9 / 5 + 32;
    return fahr.toFixed(0);
  }



 function buildPage(){
    // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
    // Set meters to feet
    meterstoFeet(storage.getItem('elevation'));

      // Set WC
    buildWC(storage.getItem('windSpeed'),convert(storage.getItem('temp')));

  //   // Dial
  //   let wind = windNumbers(storage.getItem("direction"));
  //   windNumbers(wind);
  //  console.log(wind)

   // Convert to Fahrenheit
   let celcius = convert(storage.getItem('temp'));
   console.log(celcius);
   document.getElementById("temp").innerHTML = celcius + "&deg;F";

  //hourly data
  document.getElementById("overflow").innerHTML = (storage.getItem("hourList"));
  

    // Task 2 - Populate location information
       let city = storage.getItem("locName");
   let state = storage.getItem("locState");
   let local = city + ", " + state;


    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(local);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Current Location | The Weather Site


// Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('town');
    contentHeading.innerHTML = local;
    document.getElementById("long").innerHTML = Number(storage.getItem("longitude")).toFixed(0);
    document.getElementById("lat").innerHTML = Number(storage.getItem("latitude")).toFixed(0);


    // Task 3 - Populate weather information
    document.getElementById("high").innerHTML = (storage.getItem("high"));
    document.getElementById("lowTemp").innerHTML = (storage.getItem("low"));
    document.getElementById("dir").innerHTML = (storage.getItem("winddirection"));
    document.getElementById("gust").innerHTML = (storage.getItem("windGust"));
    document.getElementById("elevation").innerHTML = (storage.getItem("elevation"));
    document.getElementById("winds").innerHTML = (storage.getItem("windSpeed"));

    // Set wind dial
    windDial(storage.getItem("winddirection"));
  


    // Task 4 - Hide status and show main    
    

    let statusContainer = document.getElementById('status');
    let contentContainer = document.getElementById('main-content');

    contentContainer.setAttribute('class',''); //removes the hide class
    statusContainer.setAttribute('class', 'hide');
   }


