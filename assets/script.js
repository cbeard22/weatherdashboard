let inputValue = $('#query');
let searchBtnEl = $('#searchBtn');
let iconEl = $("#icon");
let tempEl = $('#temp');
let windEl = $('#wind');
let humidityEl = $('#humidity');
let uvIndexEl = $('#uvIndex');
let inputQuery = "name=" + query;



let apiKey = "&appid=8bd9dc1af4a9dc570c14c41c2c1718ce";
let requestURL;

function getLatitudeLongitude(event) {
    event.preventDefault();
    let query = inputValue.val();
    requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial" + apiKey;
    localStorage.setItem("Name", query);
    localStorage.getItem("Name")
    let btn = document.createElement("BUTTON");
    btn.innerHTML = (query);
    document.body.append(btn);
    //push to array and then push to local storage then get that array when the page first loads before this function called then loop over this  array
    //and create a new button for each item in that array add an event listener 

    $.ajax({ url: requestURL, method: "GET" })

        .then(function (data) {
            let lineData = data.coord;
            weatherData(lineData);
        })
    return;
}

function weatherData(coordinates) {
    let lon = coordinates.lon;
    let lat = coordinates.lat;
    requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + apiKey;

    $.ajax({ url: requestURL, method: "GET" })

        .then(function (data) {
            let icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");


            let temp = "Temperature: " + data.current.temp + "\u00B0" + " F";
            let wind = "Windspeed: " + data.current.wind_speed + " MPH";
            let humidity = "Humidity: " + data.current.humidity + " %";
            let uvIndex = "UV Index: " + data.current.uvi;

            iconEl.empty();
            tempEl.empty();
            windEl.empty();
            humidityEl.empty();
            uvIndexEl.empty();


            $("#icon").append(icon);
            tempEl.append(temp);
            windEl.append(wind);
            humidityEl.append(humidity);
            uvIndexEl.append(uvIndex);



            //these are for 5 day forecast cards
            console.log(data);
            $('.card').empty();
            let daily = 0
            $('.card').each(function () {

                daily = daily + 1;
                console.log(daily);
                console.log(data.daily[daily].weather[0].icon);
                $("<img>").attr("src", "https://openweathermap.org/img/wn/" + data.daily[daily].weather[0].icon + "@2x.png").appendTo($(this));
                let temp5 = $("<li>").text(data.daily[daily].temp.max + " °F");
                let wind5 = $("<li>").text("Wind Speed: " + data.daily[daily].wind_speed + " MPH");
                let uv5 = $("<li>").text("UV Index: " + data.daily[daily].uvi);
                let humidity5 = $("<li class='two'>").text("Humidity: " + data.daily[daily].humidity + " %");
                $("<ul>").append(temp5, wind5, uv5, humidity5).appendTo($(this));
            });

        })
    return;
}


searchBtnEl.on("click", function (event) {
    getLatitudeLongitude(event)
});