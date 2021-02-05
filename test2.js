function currentForecast(city) {
    $("#fiveDay-forecast").empty();
  
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

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    let searchCity = $("#city-search").val().trim();
    console.log("Search City:", searchCity);
    localStorage.setItem("City", JSON.stringify(searchCity));
  
    console.log("search history is:", cities);
    let fiveDayEl = cities;
    console.log("5 day is:", fiveDayEl);
    let createRow = showHistory();
   
  
    currentForecast(searchCity);
  
  
  });

  function showHistory() {
    for (let i = 0; i < cities.length; i++) {
      let cityEl = cities[i];
      // let listItem = $("<div>");
   
      let tRow = $("<tr>");  
  
      let cityTd =  $("<td>").text(cityEl);
  
     let searchTd = cityTd.addClass("search-history");
     let textTd = cityTd.text(cityEl);
     let attrTd = cityTd.attr("date-name");
     tRow.append(cityTd, searchTd,textTd,attrTd);
     $("tbody").append(tRow);
      // cityTd = $("<td>").text(tRow);
     
     
      // listItem.append(listBtn);
   
      // $("#search-history-view").prepend("<br>");
    }
  }