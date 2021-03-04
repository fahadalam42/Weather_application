
//http://api.openweathermap.org/data/2.5/weather?q=Melbourne,AU&units=metric&appid=a8b161353d346131fde1ff4a227b2f42

const api = {
  key: "a8b161353d346131fde1ff4a227b2f42",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchBox.value);
    //console.log(searchBox.value);
  }
}

function getResults(query) {

  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);

  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp")
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>C</span>`

  let weather_el = document.querySelector('.current .weather')
  weather_el.innerText = weather.weather[0].main

  let hilow = document.querySelector('.current .hi-low')
  hilow.innerText = `${Math.round(weather.main.temp_min)}C / ${Math.round(weather.main.temp_max)}C` 
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

let day = days[d.getDay()]
let date = d.getDate()
let month = months[d.getMonth()]
let year = d.getFullYear()

return `${day} ${date} ${month} ${year}`
 }

