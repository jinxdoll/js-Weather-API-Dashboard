var cityList = [];
var cityname;
let APIKey = "fcfffdc78caadbeba241917135e27cb7";

$(document).ready(function () {});


function renderCities(){
 
  $("#cityInput").val("");









































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


  
    // for (var i = 4; i < response.length; i += 8) {
          
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

      console.log("Here is the 5day weather for:" + city.name);
      console.log("Here is the 5day wind for:" + list.wind.speed);
      console.log("Here is the 5day humidity for:" + list.main.humidity);
      console.log("Here is the 5day tempF for:" + tempF);
      console.log("Here is the 5day tempK for:" + list.main.temp);
    }
  });
}

