fetch('https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=ece0d8b1e9f26bc9f8b45549d4585e47')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setWeather(Math.round(data.main.temp - 273))
    const weatherIcon = document.querySelector('#currentWeatherIcon');
    weatherIcon.src = `icons/${data.weather[0].icon}.png`
  })
  .catch(error => console.log('Error:', error));

setWeather = (currentTemp) => {
  const weatherDiv = document.querySelector('#currentWeatherText');
  weatherDiv.innerText = `${currentTemp}°C`
}

// Replace with your own API Key
const apiKey = "ece0d8b1e9f26bc9f8b45549d4585e47";

// Sydney's coordinates
const lat = "-33.8688";
const lon = "151.2093";

// OpenWeatherMap API URL for hourly forecast
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${apiKey}`;

// Use Fetch API to get the data
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    data.hourly.slice(1, 6).forEach(d => {
      const hourlyWeatherDiv = document.querySelector("#hourlyWeather");

      const icon = d.weather[0].icon

      const characterElement2 = document.createElement('div');
      characterElement2.innerHTML = `
<p>${timeConverter(d.dt)}</p>
<img wdith=120px height=120px src="icons/${icon}.png" />
<p>${Math.round(d.temp)}°C</p>

`
      hourlyWeatherDiv.append(characterElement2);

      console.log(d)
    })
  })
  .catch(error => {
    console.log('There has been a problem with your fetch operation: ', error);
  });

fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    const quoteText = document.querySelector("#quoteText");
    quoteText.innerText = data.content
    const quoteAuthor = document.querySelector("#quoteAuthor");
    quoteAuthor.innerText = `-${data.author}`

    console.log(`${data.content} —${data.author}`)
  })

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000).toLocaleTimeString('en-US',
    {timeZone: "Australia/Sydney", hour12: true, hour: 'numeric'}
  );
  return a;
}
