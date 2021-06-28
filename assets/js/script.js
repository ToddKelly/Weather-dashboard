var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need to enter a city to search for.');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

var fiveDayF = "https://api.openweathermap.org/data/2.5/forecast?q={city}&appid=3b9b4c043ed6400637bf4bad42b80e7b"
var curDayF = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"


//Time settings
$("#time").text(moment().format("dd, MM Do YYYY, hh:mm:ss"))
setInterval(function(){
    $("#time").text(moment().format("dddd, MMMM Do YYYY, hh:mm:ss"))
},1000)