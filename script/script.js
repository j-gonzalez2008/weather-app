console.log("Archivo cargado");
const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");
const sections = [notFoundSection, searchCitySection, weatherInfoSection];

const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img img");
const currentDate = document.querySelector(".current-date");

const apiKey = "b1e70b9f97f99e2ad654250b1d5eb3ee";

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        updateWeatherInfo(cityInput.value);
        cityInput.value = "";
        cityInput.blur();
    }
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && cityInput.value !== "") {
        updateWeatherInfo(cityInput.value);
        cityInput.value = "";
        cityInput.blur();
    }
});

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    return response.json();
}

function getCurrentDate() {
    const currentDate = new Date();
    const options = {
        weekday: "short",
        day: "2-digit",
        month: "short",
    }
    return currentDate.toLocaleDateString("en-GB", options);
}

function getWeatherIcon(id) {

    if (id >= 200 && id <= 232) return "thunderstorm.svg";
    if (id >= 300 && id <= 321) return "drizzle.svg";
    if (id >= 500 && id <= 531) return "rain.svg";
    if (id >= 600 && id <= 622) return "snow.svg";
    if (id >= 701 && id <= 781) return "atmosphere.svg";

    if (id === 800) return "clear.svg";

    if (id >= 801 && id <= 804) return "clouds.svg";

    return "clouds.svg";
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData("weather", city);

    if (weatherData.cod !== 200) {
        return showDisplaySection(notFoundSection);
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
    humidityValueTxt.textContent = humidity + " %";
    windValueTxt.textContent = speed + " m/s";
    currentDate.textContent = getCurrentDate();
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;


    showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {

    for (let section of sections) {
        section.style.display = "none";
    }

    section.style.display = "flex";
}