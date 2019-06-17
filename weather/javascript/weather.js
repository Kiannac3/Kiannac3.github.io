console.log('My javascript is being read.');


const temp = 31;
const speed = 5;

// console.log(`speed is ${speed}`);
// console.log(`temp is ${temp}`);

buildWC(speed, temp);
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


// wind dial turning function

// const direction = "NNE"; //Set your own value
// windDial(direction);

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
const weatherCondition = "rain"; //Set your own value
let weather = getCondition(weatherCondition);
changeSummaryImage(weather);


function getCondition(){
    switch (weatherCondition){
      case "clear":
      case "Clear":
        return "clear";
        break;
      case "cloudy":
      case "Cloudy":
      case "clouds":
      case "Clouds":
      case "cloud":
      case "Cloud":
        return "cloud";
        break;
      case "fog":
      case "Fog":
      case "foggy":
      case "Foggy":
        return "fog";
        break;
      case "rain":
      case "Rain":
      case "rainy":
      case "Rainy":
        return "rain";
        break;
      case "snow":
      case "Snow":
      case "snowing":
      case "Snowing":
          return "snow";
        break;
  
  
      default:
      console.log("getCondition weather");
  
    }
  }
  
  function changeSummaryImage(){
    switch (weatherKeyword) {
      case "clear":
          document.getElementById("curweather").className = "clear"
        break;
      case "cloud":
        document.getElementById("curweather").className = "cloud"
        break;
      case "fog":
        document.getElementById("curweather").className = "fog"
        break;
      case "rain":
        document.getElementById("curweather").className = "rain"
        break;
      case "snow":
        document.getElementById("curweather").className = "snow"
        break;
  
      default:
        console.log("end of changeSummaryImage function");
    }
  }

// Convert meters to feet
function convertMeters(elevation) {
    const ftelevation = document.getElementById('elevationNum');

// Compute the elevation in feet
    let feetElevation = 'elevationNum' * 3.281;
    console.log(feetElevation);

// Round the answer down to integer
    feetElevation = Math.floor(feetElevation);

// Display the elevation in Feet
    console.log(feetElevation);

// Display the elevation in HTML file
    ftelevation.innerHTML = feetElevation + ' ft.';
}
    