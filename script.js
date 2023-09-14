// State

let units = "metric";
let apiKey = "3d26406161c0244d4d0a7af6db6cd64e";

// Elements
const city = document.querySelector(".city");
const dateTime = document.querySelector(".date-time p");
const weatherImg = document.querySelector(".weather-icon");
const tempture = document.querySelector(".tempture");
const forecast = document.querySelector(".forecast");
const windCard = document.querySelector(".wind");
const minMax = document.querySelector(".min-max");
const realFeel = document.querySelector(".real-feel");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const searchBtn = document.querySelector(".search i");
const inputSearch = document.querySelector("input");
const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");
// Functions

const convertTimeStamp = function (timeStamp, timeZone) {
  const convertTimeZone = timeZone / 36000;
  const date = new Date(timeStamp * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timezone: `Utc/Gmt ${convertTimeZone >= 0 ? "-" : "+"} ${Math.abs(
      convertTimeZone
    )}`,
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

const getCountryName = function (country) {
  let countryNames = new Intl.DisplayNames(["en"], { type: "region" });
  return countryNames.of(country);
};

const getData = async function () {
  try {
    let currCity = inputSearch.value;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${apiKey}&units=${units}`
    );
    const data = await res.json();
    console.log(data);
    weatherImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
    forecast.innerHTML = data.weather[0].main;
    tempture.innerHTML = `${data.main.temp.toFixed()}&#176`;
    city.innerHTML = `${data.name}, ${getCountryName(data.sys.country)}`;
    minMax.innerHTML = `Min: ${data.main.temp_min.toFixed()}&#176 Max: ${data.main.temp_max.toFixed()}&#176`;
    dateTime.innerHTML = convertTimeStamp(data.dt, data.timezone);
    realFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
    humidity.innerHTML = `${data.main.humidity.toFixed()}&#176`;
    pressure.innerHTML = `${data.main.pressure.toFixed()} Hpa`;
    wind.innerHTML = `${data.wind.deg.toFixed()}&#176`;
  } catch (err) {
    console.error(err);
  }
};

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getData();
});

fahrenheit.addEventListener("click", function () {
  if (units !== "impereal") units = "impereal";
  getData();
});

celsius.addEventListener("click", function () {
  if (units !== "metric") units = "metric";
  getData();
});
