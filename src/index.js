function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;

let descriptionElement = document.querySelector("#description");
let humidityElement= document.querySelector("#humidity");
let  windSpeedElement= document.querySelector("#wind-speed");
let iconElement= document.querySelector("#icontime");


descriptionElement.innerHTML = response.data.condition.description;
humidityElement.innerHTML= response.data.temperature.humidity;
windSpeedElement.innerHTML= response.data.wind.speed + "km/h";
iconElement.innerHTML= `<img src="${ response.data.condition.icon_url}"class= current-temperature-icon"/>`;}







function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  getForecast("Paris");
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);


function displayforecast (response) {
  console.log(response.data);

  let days= response.data.daily;
  let forecastHtml= "";
  days.forEach(function (day, index) {
    if(index < 5) {
    forecastHtml= 
    forecastHtml + `
 
 <div class="weather-forecast-day">
   <div class="weather-forecast-date"> ${formatDay(day.time)}</div>
    <img src="${day.condition.icon_url}"/> 
   <div class="weather-forecast-temperatures">
     <div class="weather-forecast-temperature">
     <strong>${Math.round(day.temperature.maximum)}°</strong>
   </div>
   <div class="weather-forecast-temperature"> ${Math.round(day.temperature.minimum)}°</div>
 </div> 
 </div>
 `;
    }//
  });
  let forecastElement= document.querySelector("#forecast");
   forecastElement.innerHTML= forecastHtml;
}

function getForecast (city) {
   let apiKey = "ce024dff2t11ac0410oc03803af4bc0a";
   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
   axios.get(apiUrl).then(displayforecast);

}


function formatDay(timestamp){
let date= new Date ( timestamp * 1000);
let days = [ "Sun", "Mon", "Tue", "Wed","Thu", "Fri","Sat"];
return days[date.getDay()];}





