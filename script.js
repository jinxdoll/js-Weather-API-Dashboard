$(document).ready(function () {
    $("#search-button").on("click", function (event) {
      event.preventDefault();
      let searchCity = $("#city-search").val().trim();
      console.log(searchCity);

      currentForecast(searchCity);
      // let searchButton = $("<button>").text(searchCity);
  
      // $("#current-forecast").append(searchButton);
      // localStorage.setItem("#current-forecast", JSON.stringify(searchButton));
      
      // $("#city-search").append(searchCity);
      // localStorage.setItem("#city-search", JSON.stringify(searchCity));
    });
  

  
    function currentForecast(city) {
      $("#search-button").empty();
  
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
          "Temperature in Kelvin:" + ((response.main.temp).toFixed(2))
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
  

  
    //   function weatherForecast (cityName) {
    //      // be,ow code will be used for search field
    //      let APIKey = "fcfffdc78caadbeba241917135e27cb7";
    //       let queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + APIKey;
    //   $.ajax({
    //     url: queryURL,
    //     method: "GET",
    //   })
  
    //   .then(function (response) {
    //     console.log("here is the queryURL:"
    //     + queryURL);
    //     console.log("here is the response:" + response);
  
    //     $(".current-city").html("Here is the weather for:" + response.name);
    //     $(".current-wind").text("Wind speed:" + response.wind.speed + "mph");
    //     $(".current-humidity").text("Relative humidity:" + response.main.humidity + "%");
  
    //     let tempF = (response.main.temp - 273.15) * 1.8 + 32;
  
    //     $(".current-temp").text("Temperature in Kelvin:" + response.main.temp);
    //     $(".current-temp").text("Temperature in Farenheit:" + tempF.toFixed(2) + "Degrees");
  
    //     console.log("Here is the weather for:" + response.name);
    //     console.log("Here is the wind for:" + response.wind.speed);
    //     console.log("Here is the humidity for:" + response.humidity);
    //     console.log("Here is the tempF for:" + response.tempF);
    //   });
    // };
  });
  console.log("aimee");
  