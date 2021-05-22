let inputValue = $('#query');
let searchBtnEl = $('#searchBtn');
let iconEl = $("#icon");
let tempEl = $('#temp')
let windEl = $('#wind')
let humidityEl = $('#humidity')
let uvIndexEl = $('#uvIndex')
let inputQuery = "name=" + query;


let apiKey = "&appid=8bd9dc1af4a9dc570c14c41c2c1718ce";
let requestURL;

function getLatLon(event) {
    event.preventDefault();
    let query = inputValue.val();
    requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial" + apiKey;

    $.ajax({url:requestURL, method: "GET"})
        /*.then(function (response) {
            return response.json();
        })*/
        .then(function (data) {
            let lineData = data.coord;
            weatherData(lineData);
        })
    return;
}

function weatherData(coordinates) {
    let lon=coordinates.lon;
    let lat=coordinates.lat;
    requestURL="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + apiKey;

    $.ajax({url:requestURL, method: "GET"})
       /* .then(function (response) {
            return response.json();
        })*/
        .then(function (data) {
            let icon=$("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
            console.log(icon);

            let temp="Temp: " + data.current.temp + "\u00B0" + "F";
            let wind="Wind: " + data.current.wind_speed + "MPH";
            let humidity="Humidity: " + data.current.humidity + "%";
            let uvIndex="UV Index: " + data.current.uvi;

           /* iconEl.empty();
            tempEl.empty();
            windEl.empty();
            humidityEl.empty();
            uvIndexEl.empty();*/

            $("#icon").append(icon);
            /*tempEl.append(temp);
            windEl.append(wind);
            humidityEl.append(humidity);
            uvIndexEl.append(uvIndex);*/
        })
    return;
}

searchBtnEl.on("click", function(){
    getLatLon()});