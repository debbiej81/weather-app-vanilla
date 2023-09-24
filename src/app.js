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

//function to show the current time

function currentTime() {
  let now = new Date();
  let currentHours = now.getHours();
  let currentMinutes = now.getMinutes().toString().padStart(2, "0");
  let currentTime = `${currentHours}:${currentMinutes}`;

  return `${currentTime}`;
}
let displayCurrentTime = document.querySelector("#current-time");
displayCurrentTime.innerHTML = currentTime();

let apiKey = "588ca52dd320c1944ac6o970bb9t8def"; // Avoid hardcoding API key
let units = "metric";
let city = "London";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

axios.get(apiUrl).then((response) => {
  displayCity(response);
  displayTemperature(response);
  displayDescription(response);
  displayFeelsLike(response);
  displayHumidity(response);
  displayWind(response);
  displayMainIcon(response);
});

//function to show the current city
function displayCity(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}

//function to show the current temperature
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
}

//function to show the current description
function displayDescription(response) {
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
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
