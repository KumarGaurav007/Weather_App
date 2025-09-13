const apiKey = 'a7963e88d7aa1f4ff8672bccc40763c0';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        alert("City not found!");
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';

        document.querySelector(".card2").style.display = "none"

        return;
    }
    else {
        document.querySelector('.error').style.display = 'none';
        document.querySelector(".card2").style.display = "block";


    }

    var data = await response.json();


    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/clouds.png"
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "assets/clear.png"
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "assets/drizzle.png"
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "assets/mist.png"
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "assets/rain.png"
    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "assets/snow.png"
    }
    else if (data.weather[0].main == "Haze") {
        weatherIcon.src = "assets/haze.png"
    }
    else {
        weatherIcon.src = "assets/rain.png"; // fallback
    }


    document.querySelector('.weather').style.display = 'block'

    document.querySelector(".sunrise").innerHTML = convertTime(data.sys.sunrise, data.timezone);
    document.querySelector(".sunset").innerHTML = convertTime(data.sys.sunset, data.timezone);
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";

    let visibilityInKm = (data.visibility / 1000).toFixed(1) + " km";
    document.querySelector(".visibility").innerHTML = visibilityInKm;

}

const infoBtn = document.querySelector(".info-btn");
infoBtn.addEventListener("click", () => {
    document.querySelectorAll(".details2").forEach(el => {
        el.style.display = "flex";
    });

});

searchBtn.addEventListener("click", () => {
    if (searchBox.value == '') {
        alert("Enter City name");
        document.querySelector('.error').style.display = 'block';
        return;
    }
    else {
        checkWeather(searchBox.value);
        document.querySelectorAll(".details2").forEach(el => {
            el.style.display = "none";
        });
    }
});

function convertTime(timestamp, timezone) {
    let localTime = new Date((timestamp + timezone) * 1000);

    let hours = localTime.getUTCHours().toString().padStart(2, "0");
    let minutes = localTime.getUTCMinutes().toString().padStart(2, "0");
    let seconds = localTime.getUTCSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}
