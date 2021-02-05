let cities = [];

let APIKey = "fcfffdc78caadbeba241917135e27cb7";

$(document).ready(function () {});

getHistory();

function showHistory() {
  for (let i = 0; i < cities.length; i++) {
    let cityEl = cities[i];
    let row = $("<div class=row>");
    let td = $("<td>");
    
    td.text(cityEl);
    td.attr("data-index", i);
    //   whhhhhhhhhhhhhhhhhhhyyyyyyyyyyyyyyyy
    // button.attr("style", "width: 100%")
    row.addClass("btn btn-secondary btn-small");   
   
    row.append(td);
    $("#history-view").append(row);
    $("#history-view").prepend("<h3>");
  }
}


function getHistory() {
  $("#history-view").empty();
  let savedCities = JSON.parse(localStorage.getItem("City"));
  if (savedCities !== null) {
    cities = savedCities;
  }
 
  showHistory();
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  let cities = [];
  let searchCity = $("#city-search").val().trim();
  if (searchCity ===""){ alert("Please Enter a name");}
  cities.push(searchCity);
  // console.log("Search City:", searchCity);
  localStorage.setItem("City", JSON.stringify(searchCity));

  // console.log("search history is:", cities);
  // let fiveDayEl = cities;
  // console.log("5 day is:", fiveDayEl);

  $("#history-view").append(cities);
 

  currentForecast(searchCity);
  fiveDayForecast(searchCity);
  


});





$(document).ready( function () {
  $("#history-view").each(function () {
    $("#fiveDay-forecast").empty();
    $("#current-forecast").empty();
    
    
  
   
    

  })


})

function currentForecast(city) {

  let APIKey = "fcfffdc78caadbeba241917135e27cb7";

  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    let cityName = $(".current-city").text("Weather For:" + response.name);

    let currentWind = $(".current-wind").text(
      "Wind speed:" + response.wind.speed + "" + "mph"
    );
    let currentHumidity = $(".current-humidity").text(
      "Relative humidity:" + response.main.humidity + "%"
    );

    let currentTempK = $(".current-tempK").text(
      "Temperature in Kelvin:" + response.main.temp.toFixed(2)
    );
    let tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
    let currentTempF = $(".current-tempF").text(
      "Temperature in Farenheit:" + tempF
    );

    console.log("Here is the weather for:" + response.name);
    console.log("Here is the wind for:" + response.wind.speed);
    console.log("Here is the humidity for:" + response.main.humidity);
    console.log("Here is the tempF for:" + tempF);
    console.log("Here is the tempK for:" + response.main.temp);
  });
}

function fiveDayForecast(fiveCity) { 
 

  let APIKey = "fcfffdc78caadbeba241917135e27cb7";
  let queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    fiveCity +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

  
  fiveDayWeather= fiveDay.list;
  for (var i = 4; i < fiveDayWeather.length; i += 8) {
    let fiveDay = fiveDayWeather[i];

    
  let cityName = $(".fiveDay-city").text("Weather For:" + city.name);

  let fiveDayWind = $(".fiveDay-wind").text(
    "Wind speed:" + list.wind.speed + "mph"
  );
  let fiveDayHumidity = $(".fiveDay-humidity").text(
    "Relative humidity:" + list.main.humidity + "%"
  );

  let fiveDayTempK = $(".fiveDay-tempK").text(
    "Temperature in Kelvin:" + list.main.temp.toFixed(2)
  );
  let tempF = ((list.main.temp - 273.15) * 1.8 + 32).toFixed(2);
  let fiveDayTempF = $(".fiveDay-tempF").text(
    "Temperature in Farenheit:" + tempF
  );

  console.log("Here is the 5day weather for:" + city.name);
  console.log("Here is the 5day wind for:" + list.wind.speed);
  console.log("Here is the 5day humidity for:" + list.main.humidity);
  console.log("Here is the 5day tempF for:" + tempF);
  console.log("Here is the 5day tempK for:" + list.main.temp);




  }

  })
};
 

//   let APIKey = "fcfffdc78caadbeba241917135e27cb7";

//   let queryURL =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//     city +
//     "&appid=" +
//     APIKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     let cityName = $(".fiveDay-city").text("Weather For:" + response.name);

//     let fiveDayWind = $(".fiveDay-wind").text(
//       "Wind speed:" + response.wind.speed + "" + "mph"
//     );
//     let fiveDayHumidity = $(".fiveDay-humidity").text(
//       "Relative humidity:" + response.main.humidity + "%"
//     );

//     let fiveDayTempK = $(".fiveDay-tempK").text(
//       "Temperature in Kelvin:" + ((response.main.temp).toFixed(2))
//     );
//     let tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
//     let fiveDayTempF = $(".fiveDay-tempF").text(
//       "Temperature in Farenheit:" + tempF
//     );

//     $('#fiveDay-forecast').append(cityName, fiveDayWind, fiveDayHumidity, fiveDayTempF, fiveDayTempK);

//     console.log("Here is the 5 day weather for:" + response.name);
//     console.log("Here is the 5 day wind for:" + response.wind.speed);
//     console.log("Here is the 5 day humidity for:" + response.main.humidity);
//     console.log("Here is the 5 day tempF for:" + tempF);
//     console.log("Here is the 5 day tempK for:" + response.main.temp);
//   });
// }
