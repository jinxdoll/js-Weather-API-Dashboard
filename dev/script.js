let cityList = [];
let cityName;

let APIKey = "fcfffdc78caadbeba241917135e27cb7";

$(document).ready(function () {});



initCityList();
initWeather();


function renderCities(){
  $("#cityList").empty();
  $("#cityInput").val("");
  for (i=0; i<cityList.length; i++){
    let renderCity = $("<a>");
    renderCity.addClass("list-group-item list-group-item-action list-group-item-primary city");
    renderCity.attr("data-name", cityList[i]);
    renderCity.text(cityList[i]);
    $("#cityList").prepend(renderCity);
}
renderCities(); 
}


function setCityArray() {
  localStorage.setItem("cities", JSON.stringify(cityList));
  }

  function setCurrentCity() {
    localStorage.setItem("currentCity", JSON.stringify(cityName));
}

function initCityList() {
  let storedCityName = JSON(localStorage.getItem("cities"));
  
  if (storedCityName !== null) {
      cityList = storedCityName;
  }
  
  renderCities();

  }


  function initWeather() {
    let storedWeather = JSON.parse(localStorage.getItem("currentCity"));

    if (storedWeather !== null) {
        cityName = storedWeather;

   
    }
}




$("#citySearchBtn").on("click", function(event){
  event.preventDefault();

  cityname = $("#cityInput").val().trim();
  if(cityname === ""){
      alert("Please enter a city to look up")

  }else if (cityList.length >= 5){  
      cityList.shift();
      cityList.push(cityname);

  }else{
  cityList.push(cityname);
  }
  setCurrentCity();
  setCityArray();
  renderCities();
  displayWeather();
  displayFiveDayForecast();
});




async function displayWeather() {

  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" +
  APIKey;

  let response = await $.ajax({
      url: queryURL,
      method: "GET"
    })
      console.log(response);


      console.log(response);
      // Most of the code below was written with the help of my tutor Coby Sher. i want to give him credit:)*******

      let currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
      let getCurrentCity = response.name;
      let date = new Date();
      let val=(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
      let getCurrentWeatherIcon = response.weather[0].icon;
      let displayCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png />");
      let currentCityEl = $("<h3 class = 'card-body'>").text(getCurrentCity+" ("+val+")");
      currentCityEl.append(displayCurrentWeatherIcon);
      currentWeatherDiv.append(currentCityEl);
      let getTemp = response.main.temp.toFixed(1);
      let tempEl = $("<p class='card-text'>").text("Temperature: "+getTemp+"° F");
      currentWeatherDiv.append(tempEl);
      let getHumidity = response.main.humidity;
      let humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
      currentWeatherDiv.append(humidityEl);
      let getWindSpeed = response.wind.speed.toFixed(1);
      let windSpeedEl = $("<p class='card-text'>").text("Wind Speed: "+getWindSpeed+" mph");
      currentWeatherDiv.append(windSpeedEl);
      let getLong = response.coord.lon;
      let getLat = response.coord.lat;
      
      let uvURL = "https://api.openweathermap.org/data/2.5/uvi?" + "&appid=" +
      APIKey+getLat+"&lon="+getLong;
      let uvResponse = await $.ajax({
          url: uvURL,
          method: "GET"
      })

      // getting UV Index info and setting color class according to value
      let getUVIndex = uvResponse.value;
      let uvNumber = $("<span>");
      if (getUVIndex > 0 && getUVIndex <= 2.99){
          uvNumber.addClass("low");
      }else if(getUVIndex >= 3 && getUVIndex <= 5.99){
          uvNumber.addClass("moderate");
      }else if(getUVIndex >= 6 && getUVIndex <= 7.99){
          uvNumber.addClass("high");
      }else if(getUVIndex >= 8 && getUVIndex <= 10.99){
          uvNumber.addClass("vhigh");
      }else{
          uvNumber.addClass("extreme");
      } 
      uvNumber.text(getUVIndex);
      let uvIndexEl = $("<p class='card-text'>").text("UV Index: ");
      uvNumber.appendTo(uvIndexEl);
      currentWeatherDiv.append(uvIndexEl);
      $("#weatherContainer").html(currentWeatherDiv);
}

async function displayFiveDayForecast() {

  let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityname+"&appid=" +
  APIKey;

  let response = await $.ajax({
      url: queryURL,
      method: "GET"
    })
    let forecastDiv = $("<div  id='fiveDayForecast'>");
    let forecastHeader = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
    forecastDiv.append(forecastHeader);
    let cardDeck = $("<div  class='card-deck'>");
    forecastDiv.append(cardDeck);
     // Most of the code below was written with the help of my tutor Coby Sher. i want to give him credit:)*******
    console.log(response);
    for (i=0; i<5;i++){
        let forecastCard = $("<div class='card mb-3 mt-3'>");
        let cardBody = $("<div class='card-body'>");
        let date = new Date();
        let val=(date.getMonth()+1)+"/"+(date.getDate()+i+1)+"/"+date.getFullYear();
        let forecastDate = $("<h5 class='card-title'>").text(val);
        
      cardBody.append(forecastDate);
      let getCurrentWeatherIcon = response.list[i].weather[0].icon;
      console.log(getCurrentWeatherIcon);
      let displayWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + ".png />");
      cardBody.append(displayWeatherIcon);
      let getTemp = response.list[i].main.temp;
      let tempEl = $("<p class='card-text'>").text("Temp: "+getTemp+"° F");
      cardBody.append(tempEl);
      let getHumidity = response.list[i].main.humidity;
      let humidityEl = $("<p class='card-text'>").text("Humidity: "+getHumidity+"%");
      cardBody.append(humidityEl);
      forecastCard.append(cardBody);
      cardDeck.append(forecastCard);
    }
    $("#forecastContainer").html(forecastDiv);
  }

// This function is used to pass the city in the history list to the displayWeather function
function historyDisplayWeather(){
  cityname = $(this).attr("data-name");
  displayWeather();
  displayFiveDayForecast();
  console.log(cityname);
  
}

$(document).on("click", ".city", historyDisplayWeather);


















// getHistory();

// function showHistory() {
//   for (let i = 0; i < cities.length; i++) {
//     let cityEl = cities[i];
//     let row = $("<div class=row>");
//     let td = $("<td>");
//     td.text(cityEl);
//     td.attr("data-index", i);
//     row.addClass("btn btn-secondary btn-small");
//     row.append(td);
//     $("#history-view").append(row);
//     $("#history-view").prepend("<h3>");
//   }
// }




// function getHistory() {
//   $("#history-view").empty();
//   let savedCities = JSON.parse(localStorage.getItem("City")) || [];
//   if (JSON.parse(localStorage.getItem("City")) ||savedCities !== null ) {
//     cities = savedCities;
//    $(".history").append(cities)
    
//   } else {
//     return ("");
//   }

//   showHistory();
// }

// function writeSearchHistory() {
//   let savedCities = JSON.parse(localStorage.getItem("City")) || [];
//   $.each(savedCities, function() {
//       showHistory(cities);
//   })
// }


// $(document).ready(function () {
//   $("#history-view").each(function () {
//     let createRow = $("<row>");
//     let history = localStorage.getItem("City");
//     $("<row>").append(createRow);
//     $(".history").append("<row>");
//   });
// });




// $("#search-button").on("click", function (event) {
//   event.preventDefault();
//   let cities = [];
//   let searchCity = $("#city-search").val().trim();
//   if (searchCity === "") {
//     alert("Please Enter a name");
//   }
  
//   if (!cities.includes(searchCity)) {
//     cities.push(searchCity);
    
//   }
//   // console.log("Search City:", searchCity);
//   localStorage.setItem("City", JSON.stringify(searchCity));
//   // console.log("search history is:", cities);
//   $(".history").append(cities);

//   currentForecast(searchCity);


   
//  });

//  let fiveDayView = document.getElementById("search-button");
//  fiveDayView.addEventListener("click", fiveDayForecast(searchCity));
//  $("#fiveDay-forecast").append(fiveDayView);



  
  





// function currentForecast(city) {
//   let APIKey = "fcfffdc78caadbeba241917135e27cb7";

//   let queryURL =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=" +
//     APIKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     let cityName = $(".current-city").text("Weather For:" + response.name);

//     let currentWind = $(".current-wind").text(
//       "Wind speed:" + response.wind.speed + "" + "mph"
//     );
//     let currentHumidity = $(".current-humidity").text(
//       "Relative humidity:" + response.main.humidity + "%"
//     );

//     let currentTempK = $(".current-tempK").text(
//       "Temperature in Kelvin:" + response.main.temp.toFixed(2)
//     );
//     let tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(2);
//     let currentTempF = $(".current-tempF").text(
//       "Temperature in Farenheit:" + tempF
//     );

//     console.log("Here is the weather for:" + response.name);
//     console.log("Here is the wind for:" + response.wind.speed);
//     console.log("Here is the humidity for:" + response.main.humidity);
//     console.log("Here is the tempF for:" + tempF);
//     console.log("Here is the tempK for:" + response.main.temp);
//   });
// }






// function fiveDayForecast(fiveCity) {
//   let APIKey = "fcfffdc78caadbeba241917135e27cb7";
//   let queryURL =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//     fiveCity +
//     "&appid=" +
//     APIKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {


  
    // for (let i = 4; i < response.length; i += 8) {
          
    //   let list = fiveList[i];

    //   let cityName = $("<h5>").attr("style", "font-size:100%").addClass("card-title text-nowrap").text("weather For:" + list.city.name)

    //   let fiveDayWind = $("<p>").addClass("card-text text-nowrap").text("Wind speed:" + list.wind.speed + "mph"
    //   );
    //   let fiveDayHumidity =$("<p>").addClass("card-text text-nowrap").text("Humidity: " + list.main.humidity + "%"
    //   );

    //   let fiveDayTempK = $("<p>").addClass("card-text text-nowrap").text(
    //     "Temperature in Kelvin:" + list.main.temp.toFixed(2)
    //   );
    //   let tempF = ((list.main.temp - 273.15) * 1.8 + 32).toFixed(2);
    //   let fiveDayTempF = $("<p>").addClass("card-text").text("Temp: " + tempF + " F");
      
   
   
      // let dayCard = $("<div>").addClass("card weather-card col-lg border border-white opacity-4 text-black font-weight-bold mr-md-2 mb-3");
      // $(dayCard).append(cityName);
      // $(dayCard).append(fiveDayWind)
      // $(dayCard).append(fiveDayHumidity);
      // $(dayCard).append(fiveDayTempK);
      // $(dayCard).append(fiveDayTempF);
      // $("#fiveDay-forecast").append(dayCard);
      // $("#fiveDay-forecast").prepend("<h5>");   
   
   
   
   
   
   
   
   
      // let fiveDay = fiveDayWeather[i];

      // let cityName = $(".fiveDay-city").text("Weather For:" + city.name);

      // let fiveDayWind = $(".fiveDay-wind").text(
      //   "Wind speed:" + list.wind.speed + "mph"
      // );
      // let fiveDayHumidity = $(".fiveDay-humidity").text(
      //   "Relative humidity:" + list.main.humidity + "%"
      // );

      // let fiveDayTempK = $(".fiveDay-tempK").text(
      //   "Temperature in Kelvin:" + list.main.temp.toFixed(2)
      // );
      // let tempF = ((list.main.temp - 273.15) * 1.8 + 32).toFixed(2);
      // let fiveDayTempF = $(".fiveDay-tempF").text(
      //   "Temperature in Farenheit:" + tempF
      // );

      // console.log("Here is the 5day weather for:" + city.name);
      // console.log("Here is the 5day wind for:" + list.wind.speed);
      // console.log("Here is the 5day humidity for:" + list.main.humidity);
      // console.log("Here is the 5day tempF for:" + tempF);
      // console.log("Here is the 5day tempK for:" + list.main.temp);

