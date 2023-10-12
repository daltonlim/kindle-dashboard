"use strict";

fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=ece0d8b1e9f26bc9f8b45549d4585e47').then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data);
  setWeather(Math.round(data.main.temp - 273));
  var weatherIcon = document.querySelector('#currentWeatherIcon');
  weatherIcon.src = "icons/".concat(data.weather[0].icon, ".png");
})["catch"](function (error) {
  return console.log('Error:', error);
});
function setWeather(currentTemp) {
  var weatherDiv = document.querySelector('#currentWeatherText');
  weatherDiv.innerText = "".concat(currentTemp, "\xB0C");
};

// Replace with your own API Key
var apiKey = "ece0d8b1e9f26bc9f8b45549d4585e47";

// Sydney's coordinates
var lat = "-33.8688";
var lon = "151.2093";

// OpenWeatherMap API URL for hourly forecast
var url = "https://api.openweathermap.org/data/2.5/onecall?lat=".concat(lat, "&lon=").concat(lon, "&exclude=current,minutely,daily,alerts&units=metric&appid=").concat(apiKey);

// Use Fetch API to get the data
fetch(url).then(function (response) {
  if (!response.ok) {
    throw new Error("HTTP error! status: ".concat(response.status));
  }
  return response.json();
}).then(function (data) {
  data.hourly.slice(1, 6).forEach(function (d) {
    var hourlyWeatherDiv = document.querySelector("#hourlyWeather");
    var icon = d.weather[0].icon;
    var characterElement2 = document.createElement('div');
    characterElement2.innerHTML = "\n<p>".concat(timeConverter(d.dt), "</p>\n<img wdith=120px height=120px src=\"icons/").concat(icon, ".png\" />\n<p>").concat(Math.round(d.temp), "\xB0C</p>\n\n");
    hourlyWeatherDiv.append(characterElement2);
    console.log(d);
  });
})["catch"](function (error) {
  console.log('There has been a problem with your fetch operation: ', error);
});
fetch('https://api.quotable.io/random').then(function (response) {
  return response.json();
}).then(function (data) {
  var quoteText = document.querySelector("#quoteText");
  quoteText.innerText = data.content;
  var quoteAuthor = document.querySelector("#quoteAuthor");
  quoteAuthor.innerText = "-".concat(data.author);
  console.log("".concat(data.content, " \u2014").concat(data.author));
});
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000).toLocaleTimeString('en-US', {
    timeZone: "Australia/Sydney",
    hour12: true,
    hour: 'numeric'
  });
  return a;
}
