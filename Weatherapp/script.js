console.log("aryan");

let cityname = document.querySelector(".city");
let date = document.querySelector(".datee");
let forcast = document.querySelector(".forcaste");
let temprature = document.querySelector(".tempraturee");
let icon = document.querySelector(".icone");
let mintem = document.querySelector(".min");
let maxtem = document.querySelector(".max");
let feel = document.querySelector(".feels");
let humiditye = document.querySelector(".humidity");
let winde = document.querySelector(".wind");
let pressuree = document.querySelector(".pressure");
let citysearch = document.querySelector(".weather_head");

const getcountryname = (e) => {
  return new Intl.DisplayNames([e], { type: "region" }).of(e);
};

const updateBackgroundVideo = (weatherCondition) => {
  const video = document.querySelector(".background-video");
  const source = video.querySelector("source");

  let videoFile = "default.mp4"; // fallback

  switch (weatherCondition.toLowerCase()) {
    case "clear":
      videoFile = "clear.mp4";
      break;
    case "clouds":
      videoFile = "clouds.mp4";
      break;
    case "rain":
      videoFile = "rain.mp4";
      break;
    case "thunderstorm":
      videoFile = "thunderstorm.mp4";
      break;
    case "snow":
      videoFile = "snow.mp4";
      break;
  }

  source.src = `videos/${videoFile}`;
  video.load();
};

const gettime = (dt) => {
  const currdate = new Date(dt * 1000);
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", option);
  return formatter.format(currdate);
};

let city = "Delhi";

citysearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = document.querySelector(".search");
  city = cityName.value;
  getweatherdata();
});

const getweatherdata = async () => {
  const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=42f6a7b71269ed8d6db667df14aa49b5&units=metric`;
  try {
    const res = await fetch(weatherurl);
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityname.innerHTML = `${name}, ${getcountryname(sys.country)}`;
    date.innerHTML = gettime(dt);
    temprature.innerHTML = `${main.temp}&#176`;
    mintem.innerHTML = `${main.temp_min.toFixed()}&#176`;
    maxtem.innerHTML = `${main.temp_max.toFixed()}&#176`;
    feel.innerHTML = `${main.feels_like}&#176`;
    humiditye.innerHTML = `${main.humidity}%`;
    winde.innerHTML = `${wind.speed} m/s`;
    pressuree.innerHTML = `${main.pressure} hPa`;
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">`;
    forcast.innerHTML = `${weather[0].main}`;

    updateBackgroundVideo(weather[0].main);

  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
};

window.addEventListener("load", getweatherdata);
