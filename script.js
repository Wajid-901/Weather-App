const userTAB = document.querySelector("[data-userWeather]");
const searchTAB = document.querySelector("[data-searchWeather]");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTAB;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

oldTab.classList.add("current-tab");
getFromSessionStorage();

// Switch tabs
function switchTab(newTab) {
    if (newTab !== oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (searchForm.classList.contains("active")) {
            searchForm.classList.remove("active");
            getFromSessionStorage();
        } else {
            grantAccessContainer.classList.remove("active");
            userInfoContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
    }
}

userTAB.addEventListener("click", () => switchTab(userTAB));
searchTAB.addEventListener("click", () => switchTab(searchTAB));

// Get coordinates from storage
function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

// Fetch weather by coordinates
async function fetchUserWeatherInfo({ lat, lon }) {
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
        alert("Failed to fetch weather data.");
    }
}

// Render weather
function renderWeatherInfo(weatherInfo) {
    document.querySelector("[data-cityName]").innerText = weatherInfo?.name;
    document.querySelector("[data-countryIcon]").src =
        `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    document.querySelector("[data-weatherDesc]").innerText = weatherInfo?.weather?.[0]?.description;
    document.querySelector("[data-weatherIcon]").src =
        `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    document.querySelector("[data-temp]").innerText = `${weatherInfo?.main?.temp} °C`;
    document.querySelector("[data-windspeed]").innerText = `${weatherInfo?.wind?.speed} m/s`;
    document.querySelector("[data-humidity]").innerText = `${weatherInfo?.main?.humidity}%`;
    document.querySelector("[data-cloudiness]").innerText = `${weatherInfo?.clouds?.all}%`;
}

// Get location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation not supported by your browser.");
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

document.querySelector("[data-grantAccess]").addEventListener("click", getLocation);

// Search weather by city
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = document.querySelector("[data-search-Input]").value.trim();
    if (cityName) {
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
        alert("City not found.");
    }
}
