// Global variable declarations
var cityList = [];
var cityname;

function renderCities() {
  $('#cityList').empty();
  $('#cityInput').val('');

  for (i = 0; i < cityList.length; i++) {
    var a = $('<a>');
    a.addClass(
      'list-group-item list-group-item-action list-group-item-primary city'
    );
    a.attr('data-name', cityList[i]);
    a.text(cityList[i]);
    $('#cityList').prepend(a);
  }
}

function initCityList() {
  var storedCities = JSON.parse(localStorage.getItem('cities'));

  if (storedCities !== null) {
    cityList = storedCities;
  }

  renderCities();
  initCityList();
}

function initWeather() {
  var storedWeather = JSON.parse(localStorage.getItem('currentCity'));

  if (storedWeather !== null) {
    cityname = storedWeather;

    displayCurrentWeather();
    displayFiveDayForecast();
  }
  initWeather();
}

function setCityArray() {
  localStorage.setItem('cities', JSON.stringify(cityList));
}

function setCurrentCity() {
  localStorage.setItem('currentCity', JSON.stringify(cityname));
}

// Click event handler for city search button
$('#citySearchBtn').on('click', function (event) {
  event.preventDefault();

  cityname = $('#cityInput').val().trim();
  if (cityname === '') {
    alert('Please enter a city to look up');
  } else if (cityList.length >= 5) {
    cityList.shift();
    cityList.push(cityname);
  } else {
    cityList.push(cityname);
  }
  setCurrentCity();
  setCityArray();
  renderCities();
  displayCurrentWeather();
  displayFiveDayForecast();
});

$('#cityInput').keypress(function (e) {
  if (e.which == 13) {
    $('#citySearchBtn').click();
  }
});

async function displayCurrentWeather() {
  var queryURL =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityname +
    '&units=imperial&appid=fcfffdc78caadbeba241917135e27cb7';

  var response = await $.ajax({
    url: queryURL,
    method: 'GET',
  });
  console.log(response);

  // Most of the below code was para-coded with my tutor Coby sher. I want to make sure he gets credit******

  var currentWeatherDiv = $("<div class='card-body' id='currentWeather'>");
  var getCurrentCity = response.name;
  var date = new Date();
  var val =
    date.getMonth() + 1 + '/' + date.getDate(1 - 31) + '/' + date.getFullYear();
  var getCurrentWeatherIcon = response.weather[0].icon;
  var displayCurrentWeatherIcon = $(
    '<img src = http://openweathermap.org/img/wn/' +
      getCurrentWeatherIcon +
      '@2x.png />'
  );
  var currentCityEl = $("<h3 class = 'card-body'>").text(
    getCurrentCity + ' (' + val + ')'
  );
  currentCityEl.append(displayCurrentWeatherIcon);
  currentWeatherDiv.append(currentCityEl);
  var getTemp = response.main.temp.toFixed(1);
  var tempEl = $("<p class='card-text'>").text(
    'Temperature: ' + getTemp + '° F'
  );
  currentWeatherDiv.append(tempEl);
  var getHumidity = response.main.humidity;
  var humidityEl = $("<p class='card-text'>").text(
    'Humidity: ' + getHumidity + '%'
  );
  currentWeatherDiv.append(humidityEl);
  var getWindSpeed = response.wind.speed.toFixed(1);
  var windSpeedEl = $("<p class='card-text'>").text(
    'Wind Speed: ' + getWindSpeed + ' mph'
  );
  currentWeatherDiv.append(windSpeedEl);
  var getLong = response.coord.lon;
  var getLat = response.coord.lat;

  var uvURL =
    'https://api.openweathermap.org/data/2.5/uvi?appid=fcfffdc78caadbeba241917135e27cb7&lat=' +
    getLat +
    '&lon=' +
    getLong;
  var uvResponse = await $.ajax({
    url: uvURL,
    method: 'GET',
  });

  var getUVIndex = uvResponse.value;
  var uvNumber = $('<span>');
  if (getUVIndex > 0 && getUVIndex <= 2.99) {
    uvNumber.addClass('low');
  } else if (getUVIndex >= 3 && getUVIndex <= 5.99) {
    uvNumber.addClass('moderate');
  } else if (getUVIndex >= 6 && getUVIndex <= 7.99) {
    uvNumber.addClass('high');
  } else if (getUVIndex >= 8 && getUVIndex <= 10.99) {
    uvNumber.addClass('vhigh');
  } else {
    uvNumber.addClass('extreme');
  }
  uvNumber.text(getUVIndex);
  var uvIndexEl = $("<p class='card-text'>").text('UV Index: ');
  uvNumber.appendTo(uvIndexEl);
  currentWeatherDiv.append(uvIndexEl);
  $('#weatherContainer').html(currentWeatherDiv);
}

// Most of the below code was para-coded with my tutor Coby sher. I want to make sure he gets credit******
async function displayFiveDayForecast() {
  var queryURL =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    cityname +
    '&units=imperial&appid=fcfffdc78caadbeba241917135e27cb7';

  var response = await $.ajax({
    url: queryURL,
    method: 'GET',
  });
  var forecastDiv = $("<div  id='fiveDayForecast'>");
  var forecastHeader = $("<h5 class='card-header border-secondary'>").text(
    '5 Day Forecast'
  );
  forecastDiv.append(forecastHeader);
  var cardDeck = $("<div  class='card-deck'>");
  forecastDiv.append(cardDeck);

  console.log(response);
  for (i = 0; i < 5; i++) {
    var forecastCard = $("<div class='card mb-3 mt-3'>");
    var cardBody = $("<div class='card-body'>");
    var date = new Date();
    var val =
      date.getMonth() +
      1 +
      '/' +
      (date.getDate() + i + 1) +
      '/' +
      date.getFullYear();
    var forecastDate = $("<h5 class='card-title'>").text(val);

    cardBody.append(forecastDate);
    var getCurrentWeatherIcon = response.list[i].weather[0].icon;
    console.log(getCurrentWeatherIcon);
    var displayWeatherIcon = $(
      '<img src = http://openweathermap.org/img/wn/' +
        getCurrentWeatherIcon +
        '.png />'
    );
    cardBody.append(displayWeatherIcon);
    var getTemp = response.list[i].main.temp;
    var tempEl = $("<p class='card-text'>").text('Temp: ' + getTemp + '° F');
    cardBody.append(tempEl);
    var getHumidity = response.list[i].main.humidity;
    var humidityEl = $("<p class='card-text'>").text(
      'Humidity: ' + getHumidity + '%'
    );
    cardBody.append(humidityEl);
    forecastCard.append(cardBody);
    cardDeck.append(forecastCard);
  }
  $('#forecastContainer').html(forecastDiv);
}

function displayHistory() {
  cityname = $(this).attr('data-name');
  displayCurrentWeather();
  displayFiveDayForecast();
  console.log(cityname);
}

$(document).on('click', '.city', displayHistory);
