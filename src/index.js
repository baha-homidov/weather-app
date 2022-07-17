/* eslint-disable comma-dangle */
import "./style.css";

const searchBar = document.querySelector("input");
const form = document.querySelector("form");

class WeatherObject {
  constructor(
    cityName,
    countryName,
    temp,
    feelsLike,
    humidity,
    weatherDescription,
    weatherMain
  ) {
    this.cityName = cityName;
    this.countryName = countryName;
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.weatherMain = weatherMain;
    this.weatherDescription = weatherDescription;
  }
}

async function makeApiCall(cityName) {
  const apiKey = "7fdbc7aa6a75a22aa698b65b12ba530c";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`,
    { mode: "cors" }
  );
  const responseData = await response.json();

  return responseData;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  makeApiCall(searchBar.value).then((result) => {
    if (result.cod === "404") {
      console.log("not found");
      return;
    }
    const resultObj = new WeatherObject(
      result.name,
      result.sys.country,
      result.main.temp,
      result.main.feels_like,
      result.main.humidity,
      result.weather[0].description,
      result.weather[0].main
    );
    console.log(resultObj);
  });
});
