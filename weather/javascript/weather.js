// Weather Site Javascript Functions


// Javascript test 

console.log('My javascript is being read.');



// WIND CHILL FUNCTION  

// let speed = document.getElementById('currWind');
// let temp = document.getElementById('currTemp');

const temp = 31;
const speed = 5;

// console.log(`speed is ${speed}`);
// console.log(`temp is ${temp}`);

buildWC(speed, temp)
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


// Gathers Data to calculate wind chill
  
  let temp = parseFloat(document.getElementById('tempnow').innerHTML);
  let speed = parseFloat(document.getElementById('windspeed').innerHTML);

// Calls the function

  buildWC(speed, temp);




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


// Gathers Information for windDial Function

  let direction = document.getElementById('wdirection').innerHTML;


// Calls windDial Function

  windDial(direction);



// Background Image Change Function
let condition = document.getElementById("sky").innerHTML;
let lower = condition.toLowerCase();
let c = lower.includes("clear");
let cloud = lower.includes("cloudy");
let f = lower.includes("foggy");
let r = lower.includes("rain");
let s = lower.includes("snowing");

getCondition(c, cloud, f, r, s);
function getCondition(c, cloud, f, r , s) {
      if (c == true){
        return "clear";
      }
      if (cloud == true){
        return "cloud";
      }
      if (f == true) {
        return "fog";
      }
      if (r == true) {
        return "rain";
      }
      if (s == true) {
        return "snow";
      
}
}

 


let weather = getCondition(c, cloud, f , r ,s);


changeSummaryImage(weather);

function changeSummaryImage(weather) {
         
  const threecontainer = document.getElementById("threecontainer");
  const weatherinfoimage = document.getElementById("weatherinfoimage");
          if (weather == "clear") {
              threecontainer.setAttribute("class", "clear");
              weatherinfoimage.setAttribute("class", "clear");
          }
          if (weather == "cloud") {
            threecontainer.setAttribute("class", "cloud");
            weatherinfoimage.setAttribute("class", "cloud");
          }
          if (weather == "fog") {
            threecontainer.setAttribute("class", "fog");
            weatherinfoimage.setAttribute("class", "fog");
          }
          if (weather == "rain") {
            threecontainer.setAttribute("class", "rain");
            weatherinfoimage.setAttribute("class", "rain");
          }
          if (weather == "snow") {
            threecontainer.setAttribute("class", "snow");
            weatherinfoimage.setAttribute("class", "snow");
          }

         
}
