// api key for http://openweathermap.com
var apiKey = "9e99dcfd204dceceaad5fa4a6a3fcf66"

var searchBtn = $('#searchBtn');
//creates a cityReq variable
var cityReq;
var historyList = $('.historyList ul')
var inputEll = "";
//creates the history to be placed in local storage 
var historyArr = JSON.parse(localStorage.getItem('history')) || [];
var lat;
var lon;
document.getElementById("currentWeather").style.display = "none";
document.getElementById("weather").style.display = "none";
//creates the funtion to call color id for UV index
function getUvIndex() {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then((data) => {

            var uvEl = $('<p>').attr('id', 'uvEl').text('UV Index: ');
            var span = $('<span>').text(data.value)

            $('#currentWeather .currentWeather').append(uvEl.append(span));

            if (data.value > 0 && data.value <= 5) {
                uvEl.attr('class', 'green');
                   }
            else if (data.value > 6 && data.value <= 8) {
                uvEl.attr('class', 'orange')
            }
            else if (data.value > 9 && data.value >=10) {
                uvEl.attr('class', 'red')
           
            }

        });
}

// 5 day weather forcast
function getWeatherForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityReq}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then((data) => {
            $('.forecast').empty();
            document.getElementById("weather").style.display = "block"; 
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
                    console.log(data.list[i])
                    // variable for weather icons 
                    var skyConditions = data.list[i].weather[0].icon

                    console.log(data.list[i].weather[0].icon)


                    // weather icons
                    var icon = 'https://openweathermap.org/img/wn/' + skyConditions + '@2x.png';
                    console.log(icon);
                    var dataEl = moment().format("M/D/YYYY")
                    // humidity
                    var tempatureEl = data.list[i].main.temp
                    var maxTempEl = data.list[i].main.temp_max
                    var minTemp = data.list[i].main.temp_min
                    var humidityEl = data.list[i].main.humidity

                    
                    var col = document.createElement('div');
                    var imgTag = document.createElement('img');
                    var card = document.createElement('div');
                    var cardBody = document.createElement('div');
                    var header4 = document.createElement('h4')
                    var cardText = document.createElement('p');
                    var cardTextEl = document.createElement('p');
                    var cardtext = document.createElement('p');
                    var cardtextE = document.createElement('p');
                   
                    imgTag.setAttribute('src', icon);
                    card.setAttribute('class', 'card text-center rounded bg-primary text-white');
                    cardBody.setAttribute('class', 'card-body');
                    col.setAttribute('class', 'col')
                    header4.setAttribute('class', 'card-title text-bold');
                    cardText.setAttribute('class', 'card-text');
                    cardTextEl.setAttribute('class', 'card-text');
                    cardtext.setAttribute('class', 'card-text');
                    cardtextE.setAttribute('class', 'card-text');
                    // Changes the cards to reflect the requested information 
                    header4.textContent = (dataEl);
                    cardTextEl.textContent = ("Temp: " + Math.round(tempatureEl) + '°C');
                    cardtext.textContent = ("Max Temp: " + Math.round(maxTempEl) + '°C');
                    cardText.textContent = ("Min Temp: " + Math.round(minTemp) + '°C');
                    cardtextE.textContent = ("Humidity: " + humidityEl + '%');
                    card.append(cardBody);
                    // creating the card layout
                    cardBody.append(header4, imgTag, cardTextEl, cardtext, cardText, cardtextE);
                    $('.forecast').append(card)

                }
            }
        })
}

//current weather 
function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityReq}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then((data) => {
            $('#currentWeather').empty();
            document.getElementById("currentWeather").style.display = "block";
             var card = $('<div>').addClass('currentWeather');

            var dateEl = $('<p>').attr('id', 'date').text(moment().format("MM/DD/YYYY"))
            card.append(dateEl)
            $('#currentWeather').append(card)

            var cityEl = $('<h2>').addClass('cityName').text(data.name)
            card.append(cityEl);
            $('#currentWeather').append(card)

            var tempEl = $('<p>').text('Temperature: ' + Math.round(data.main.temp) + '°C');
            card.append(tempEl);
            $('#currentWeather').append(card);

            var feelsLike = $('<p>').text('Feels Like: ' + Math.round(data.main.feels_like) + '°C');
            card.append(feelsLike)
            $('#currentWeather').append(card);

            var wind = $('<p>').text('Wind Speed: ' + data.wind.speed + ' ' + 'km/h');
            card.append(wind)
            $('#currentWeather').append(card);

            var humidity = $('<p>').text('Humidity: ' + data.main.humidity + '%');
            card.append(humidity)
            $('#currentWeather').append(card);

            var tempMax = $('<p>').text('Max Temp: ' + Math.round(data.main.temp_max) + '°C');
            card.append(tempMax)
            $('#currentWeather').append(card);

            var tempMin = $('<p>').text('Min Temp: ' + Math.round(data.main.temp_min) + '°C');
            card.append(tempMin)
            $('#currentWeather').append(card);
            lat = data.coord.lat;
            lon = data.coord.lon;
            
            getUvIndex();



        });
};

// creating history in consul log
searchBtn.on('click', function () {
   
    cityReq = $('#input-search').val();
    if (historyArr.indexOf(cityReq) === -1) {

        historyArr.push(cityReq);
        localStorage.setItem('history', JSON.stringify(historyArr))
    }

    getWeather();
    getWeatherForecast();
});


function historySelect() {
// places the city name into the history and calls the weather
    cityReq = this.value;
    getWeather();
    getWeatherForecast();

}

// calling history array
function loadHistory() {
    // creates history list

    for (let i = 0; i < historyArr.length; i++) {
        var history = historyArr[i];
        var li = document.createElement('li')
        var buttonTagEl = document.createElement('button');
      
        buttonTagEl.classList = 'list-group-item align-center';
        buttonTagEl.setAttribute('value', history);
        buttonTagEl.innerHTML = history;
        buttonTagEl.onclick = historySelect;

        li.append(buttonTagEl);

        var list = document.querySelector('.list-group');
        list.appendChild(li);

    }
};
loadHistory()
