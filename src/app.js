//function to show the current date

function getDateSuffix(date) {
  if (date % 10 === 1 && date !== 11) {
    return "st";
  } else if (date % 10 === 2 && date !== 12) {
    return "nd";
  } else if (date % 10 === 3 && date !== 13) {
    return "rd";
  } else {
    return "th";
  }
}

function currentDate() {
  let now = new Date();

  let currentDate = now.getDate();
  let suffix = getDateSuffix(currentDate);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  return `${day} ${currentDate}${suffix} ${month}`;
}
let displayTodaysDate = document.querySelector("#current-date");
displayTodaysDate.innerHTML = currentDate();

function currentTime() {
  let now = new Date();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes().toString().padStart(2, "0");
  let currentTime = `${currentHours}:${currentMinutes}`;

  return `${currentTime}`;
}
let displayCurrentTime = document.querySelector("#current-time");
displayCurrentTime.innerHTML = currentTime();

//the following code is to display forecast weather info on the page

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weather-forecast-day">Sat</div>
                <div class="forecast-img">
                  <img
                    src="images/github-mark/github-mark.png"
                    alt="holding pic"
                  />
                </div>
                <div class="forecast-temp">
                  <span class="forecast-max-temp"> 18°</span>
                  <span class="forecast-min-temp"> 12°</span>
                </div>`;
    forecastHTML = forecastHTML + `</div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

//The following code updates on screen data based on current location (geo settings)

//function to show the current temperature
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  celsiusTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = celsiusTemperature;
}

//function to show the current city
function displayCity(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

function capitaliseEveryWord(string) {
  return string
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
//function to show the current description
function displayDescription(response) {
  let descriptionElement = document.querySelector("#description");
  let weatherDescription = response.data.condition.description;
  let capitalisedWeatherDescription = capitaliseEveryWord(weatherDescription);
  descriptionElement.innerHTML = `${capitalisedWeatherDescription}`;
}
//function to show the current feels like temperature
function displayFeelsLike(response) {
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
}

//function to show the current humidity
function displayHumidity(response) {
  let humidityElement = document.querySelector("#current-humid");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
}

//function to show the current wind
function displayWind(response) {
  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
}

//function to display the current Weather Icon for daytime
function displayMainIcon(response) {
  const Image = document.getElementById("main-icon");
  Image.src = response.data.condition.icon_url;
  Image.alt = response.data.condition.icon;
}
function fetchWeatherForCurrentPosition(position) {
  let apiKey = "588ca52dd320c1944ac6o970bb9t8def";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(function (response) {
    displayTemperature(response);
    displayCity(response);
    displayDescription(response);
    displayFeelsLike(response);
    displayHumidity(response);
    displayWind(response);
    displayMainIcon(response);
    displayForecast();
  });
}

//The following code updates on screen data based on searched location
function fetchWeatherForSearchedCity(city) {
  let apiKey = "588ca52dd320c1944ac6o970bb9t8def";
  let units = "metric";
  let searchCity = city || document.querySelector("#city-search-box").value;
  let capitalisedCity = capitaliseEveryWord(searchCity);
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${capitalisedCity}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(function (response) {
    displayTemperature(response);
    displayCity(response);
    displayDescription(response);
    displayFeelsLike(response);
    displayHumidity(response);
    displayWind(response);
    displayMainIcon(response);
    displayForecast();
  });
}

let searchedLocationButton = document.querySelector("#search-button");
searchedLocationButton.addEventListener("click", fetchWeatherForSearchedCity);

let searchedLocationBox = document.querySelector("#city-search-box");
searchedLocationBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    fetchWeatherForSearchedCity();
  }
});

function fetchWeatherForLondon() {
  let apiKey = "588ca52dd320c1944ac6o970bb9t8def";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(function (response) {
    displayTemperature(response);
    displayCity(response);
    displayDescription(response);
    displayFeelsLike(response);
    displayHumidity(response);
    displayWind(response);
    displayMainIcon(response);
  });
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

fetchWeatherForSearchedCity("London");
