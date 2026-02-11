const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const apiKey = "d42f0c11f1e5de10b6efc5b0d86384ec";
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");
const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".Wind-value-txt");
const weatherSummaryimg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt");

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});
cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});
async function getfetchData(endPoint, city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiurl);
  return response.json();
}
function getWeatherIcon(id) {
  if (id >= 200 && id <= 232) return "thunderstorm.svg";
  if (id >= 300 && id <= 321) return "drizzle.svg";
  if (id >= 500 && id <= 531) return "rain.svg";
  if (id >= 600 && id <= 622) return "snow.svg";
  if (id >= 700 && id <= 781) return "atmosphere.svg";
  if (id === 800) return "clear.svg";
  if (id >= 801 && id <= 804) return "clouds.svg";
  return "clouds.svg"; // Default if no match
}

async function updateWeatherInfo(city) {
  const weatherData = await getfetchData("weather", city);
  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }
  console.log(weatherData);
  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) + " °C";
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = humidity + "%";
  windValueTxt.textContent = speed + " M/s";
  // Debugging: Cek URL gambar
  console.log(`../assets/weather/${getWeatherIcon(id)}`);
  showDisplaySection(weatherInfoSection);
  weatherSummaryimg.src = `../assets/weather/${getWeatherIcon(id)}`;
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );

  section.style.display = "flex";
}
