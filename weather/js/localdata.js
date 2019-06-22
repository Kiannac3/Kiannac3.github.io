

let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

let weatherURL = "https://Kiannac3.github.io/weather/js/weather.json";
fetchData(weatherURL);
function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];
// ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let curTemp = g.Temp;
    console.log(curTemp);

    // Get the wind data 
    let windSpeed = g.Wind;
    console.log(windSpeed);

    // Get the current conditions
    let summary = g.Summary;
    console.log(summary);

    // Get the hourly data 
    let elevation = g.Elevation;
    console.log(elevation);

    // Get location
    let longitude = g.Longitude;
    console.log(longitude);
    let latitude = g.Latitude;
    console.log(latitude);

    // Get gusts
    let gusts = g.Gusts;
    console.log(gusts);

    // Get wind Direction
    let windDir = g.Direction;
    console.log(windDir);

    // Get high and low temp
    let high = g.High;
    console.log(high);
    let low = g.Low;
    console.log(low);

    // Get Precipitiation
    let precip = g.Precip;
    console.log('precipitation is:' +precip);



    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set the temperature information
document.getElementById("curTemp").innerHTML = curTemp;

    // Set the wind information
document.getElementById("wind-speed").innerHTML = windSpeed;
buildWC(windSpeed,curTemp)

      // Set the current conditions information
      document.getElementById('sum-title').innerHTML = currCondition;

      // Set the hourly temperature information
      document.getElementById('overflow').innerHTML = buildHourlyData(nextHour, hourlyData);
  
      // Set background images
      //let condition = getCondition(currCondition);
      //changeSummaryImage(condition);
  
      // Set elevation
      document.getElementById('elevation').innerHTML = meterstoFeet(elev);
  
      // Set zip
      document.getElementById('zipcode').innerHTML = zip;
  
      // Set Long and Lat
      document.getElementById('long').innerHTML = longitude + "&deg; N";
      document.getElementById('lat').innerHTML = latitude + "&deg; W";
  
      // Set Gusts
      document.getElementById('gust').innerHTML = gusts;
  
      // Set wind Direction
      document.getElementById('dir').innerHTML = windDir;
      
      // Set high and low temp
      document.getElementById('high').innerHTML = high;
      document.getElementById('low').innerHTML = low;
  
      // Set Precipitation
      document.getElementById('precip').innerHTML = precip;
  
      // Set wind dial
      dial(windDir);



//    // Build the hourly temperature list
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




// // Convert, Format time to 12 hour format
// function format_time(hour) {

// }


// // Convert, Format time to 12 hour format
// function format_time(hour) {
//     if(hour > 23){ 
//      hour -= 24; 
//     } 
//     let amPM = (hour > 11) ? "pm" : "am"; 
//     if(hour > 12) { 
//      hour -= 12; 
//     } 
//     if(hour == 0) { 
//      hour = "12"; 
//     } 
//     return hour + amPM;
//    }

// // Build the hourly temperature list
// function buildHourlyData(nextHour,hourlyTemps) {
//     // Data comes from a JavaScript object of hourly temp name - value pairs
//     // Next hour should have a value between 0-23
//     // The hourlyTemps variable holds an array of temperatures
//     // Line 175 builds a list item showing the time for the next hour 
//     // and then the first element (value in index 0) from the hourly temps array
//      let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
//      // Build the remaining list items using a for loop
//      for (let i = 1, x = hourlyTemps.length; i < x; i++) {
//       hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
//      }
//      console.log('HourlyList is: ' +hourlyListItems);
//      return hourlyListItems;
//     }