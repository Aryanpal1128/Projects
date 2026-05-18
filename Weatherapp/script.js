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

const weatherThemes = {
  clear: {
    background: "rgba(255, 170, 0, 0.08)",
    borderColor: "rgba(255, 190, 80, 0.25)",
    glowColor: "rgba(255, 170, 0, 0.15)",
    accentColor: "#ffe082",
    bodyBg: "#0f0c03"
  },
  clouds: {
    background: "rgba(180, 200, 220, 0.08)",
    borderColor: "rgba(200, 220, 240, 0.2)",
    glowColor: "rgba(180, 200, 220, 0.1)",
    accentColor: "#e2e8f0",
    bodyBg: "#080c10"
  },
  rain: {
    background: "rgba(0, 120, 255, 0.06)",
    borderColor: "rgba(60, 170, 255, 0.2)",
    glowColor: "rgba(0, 120, 255, 0.15)",
    accentColor: "#93c5fd",
    bodyBg: "#020a14"
  },
  thunderstorm: {
    background: "rgba(147, 51, 234, 0.06)",
    borderColor: "rgba(168, 85, 247, 0.25)",
    glowColor: "rgba(147, 51, 234, 0.2)",
    accentColor: "#d8b4fe",
    bodyBg: "#0d031a"
  },
  snow: {
    background: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    glowColor: "rgba(255, 255, 255, 0.15)",
    accentColor: "#e0f2fe",
    bodyBg: "#050b12"
  },
  atmosphere: {
    background: "rgba(150, 160, 175, 0.06)",
    borderColor: "rgba(180, 190, 200, 0.2)",
    glowColor: "rgba(150, 160, 175, 0.1)",
    accentColor: "#cbd5e1",
    bodyBg: "#070b0e"
  }
};

const updateBackgroundVideo = (weatherCondition) => {
  const video = document.querySelector(".background-video");
  const source = video.querySelector("source");
  const container = document.querySelector(".container");
  const cards = document.querySelectorAll(".card");
  const icons = document.querySelectorAll(".card i");
  const searchInput = document.querySelector(".search");

  let videoFile = "clear.mp4"; // fallback to clear
  let theme = weatherThemes.clear;

  switch (weatherCondition.toLowerCase()) {
    case "clear":
      videoFile = "clear.mp4";
      theme = weatherThemes.clear;
      break;
    case "clouds":
      videoFile = "clouds.mp4";
      theme = weatherThemes.clouds;
      break;
    case "rain":
    case "drizzle":
      videoFile = "rain.mp4";
      theme = weatherThemes.rain;
      break;
    case "thunderstorm":
      videoFile = "thunderstorm.mp4";
      theme = weatherThemes.thunderstorm;
      break;
    case "snow":
      videoFile = "snow.mp4";
      theme = weatherThemes.snow;
      break;
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
    case "sand":
    case "ash":
    case "squall":
    case "tornado":
      videoFile = "clouds.mp4"; // Atmospheric weather types map to clouds
      theme = weatherThemes.atmosphere;
      break;
    default:
      videoFile = "clear.mp4";
      theme = weatherThemes.clear;
      break;
  }

  // Update video element source
  source.src = `videos/${videoFile}`;
  video.load();

  // Apply dynamic colors and theme values to the elements
  document.body.style.backgroundColor = theme.bodyBg;
  
  // Transition the elements beautifully
  container.style.background = theme.background;
  container.style.borderColor = theme.borderColor;
  container.style.boxShadow = `0 12px 40px 0 rgba(0, 0, 0, 0.3), 0 0 30px ${theme.glowColor}`;

  // Cards update
  cards.forEach(card => {
    card.style.background = theme.background;
    card.style.borderColor = theme.borderColor;
  });

  // Icon glow update
  icons.forEach(icon => {
    icon.style.color = theme.accentColor;
    icon.style.textShadow = `0 0 10px ${theme.glowColor}`;
  });

  // Search input styling
  if (searchInput) {
    searchInput.style.borderColor = theme.borderColor;
    searchInput.style.background = `rgba(255, 255, 255, 0.05)`;
  }
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

const getweatherdata = async (lat = null, lon = null) => {
  let weatherurl = "";
  if (lat !== null && lon !== null) {
    weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=42f6a7b71269ed8d6db667df14aa49b5&units=metric`;
  } else {
    weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=42f6a7b71269ed8d6db667df14aa49b5&units=metric`;
  }

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

    // Update global city and searchBox input to show exact location loaded
    city = `${name}, ${sys.country}`;
    const searchInputEl = document.querySelector(".search");
    if (searchInputEl) {
      searchInputEl.value = `${name}, ${sys.country}`;
    }

  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
};

const locateUser = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getweatherdata(latitude, longitude);
      },
      (error) => {
        console.log("Error getting location:", error.message);
        // Fallback to default city "Delhi" on error
        getweatherdata();
      }
    );
  } else {
    console.log("Geolocation not supported by this browser.");
    getweatherdata();
  }
};

window.addEventListener("load", locateUser);

// Listen to the GPS button click
const gpsBtn = document.querySelector(".gps-btn");
if (gpsBtn) {
  gpsBtn.addEventListener("click", () => {
    // Briefly animate the GPS needle to show interaction
    gpsBtn.style.color = "#ffe082";
    gpsBtn.style.transform = "translateY(-50%) scale(0.9)";
    setTimeout(() => {
      gpsBtn.style.transform = "translateY(-50%) scale(1)";
      gpsBtn.style.color = ""; // reset color
    }, 300);
    locateUser();
  });
}

// Search suggestions autocomplete geocoding logic
const suggestionsList = document.querySelector(".suggestions-list");
const searchBox = document.querySelector(".search");
let debounceTimer;

if (searchBox && suggestionsList) {
  searchBox.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    clearTimeout(debounceTimer);
    
    if (query.length < 3) {
      suggestionsList.classList.remove("active");
      suggestionsList.innerHTML = "";
      return;
    }
    
    debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
  });
}

const fetchSuggestions = async (query) => {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=42f6a7b71269ed8d6db667df14aa49b5`;
  try {
    const res = await fetch(geoUrl);
    const data = await res.json();
    displaySuggestions(data);
  } catch (err) {
    console.log("Error fetching geo suggestions:", err);
  }
};

const displaySuggestions = (cities) => {
  suggestionsList.innerHTML = "";
  
  if (!cities || cities.length === 0) {
    suggestionsList.classList.remove("active");
    return;
  }
  
  cities.forEach((cityItem) => {
    const item = document.createElement("div");
    item.classList.add("suggestion-item");
    
    const displayLocation = cityItem.state ? `${cityItem.name}, ${cityItem.state}` : cityItem.name;
    item.innerHTML = `
      <span>${displayLocation}</span>
      <span class="country-code">${cityItem.country}</span>
    `;
    
    item.addEventListener("click", () => {
      searchBox.value = `${cityItem.name}, ${cityItem.country}`;
      city = `${cityItem.name}, ${cityItem.country}`; // updates global city variable correctly!
      getweatherdata();
      suggestionsList.classList.remove("active");
      suggestionsList.innerHTML = "";
    });
    
    suggestionsList.appendChild(item);
  });
  
  suggestionsList.classList.add("active");
};

// Close suggestions list when clicking outside
document.addEventListener("click", (e) => {
  if (searchBox && !searchBox.contains(e.target) && !suggestionsList.contains(e.target)) {
    suggestionsList.classList.remove("active");
  }
});
