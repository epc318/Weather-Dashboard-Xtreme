let currentForecast = function(location, data) {
    let city = document.querySelector('#city');
    let temp = document.querySelector('#temp');
    let wind = document.querySelector('#windSpeed');
    let humidity = document.querySelector('#humid');

    let inset = document.querySelector('#inset');
    let insetID = data.current.weather[0].inset;
    let insetURL = 'https://openweathermap.org/img/w/'+insetID+'.png';

    city.textContent = location;
    inset.src = insetURL
    temp.textContent = data.present.temp + '°F';
    wind.textContent = data.present.speed + 'mph';
    humidity.textContent = data.present.humidity + '%';
};



let cityLatLong = function(location, data) {
    let lat = data.coord.lat;
    let long = data.coord.long;
    let apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='
    +long+'&exclude=minutely,hourly&units=imperial&appid=bc541e0acdc6372acb78d3865f34ac3b';

    fetch(apiURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                currentForecast(location, data);
            })
        } 
        else {
            console.log('The city you searched does not exist, please try again.');
        }
    })
};

let submitAPI = function(event) {
    event.preventDefault();
    let location = document.querySelector("#location").value;
    fetch(apiURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            cityLatLong(location, data);
            })
        }
        else {
            console.log('The city you searched does not exist, please try again.');
        }
    }); 
};

document.querySelector('#searchBtn').addEventListener('click', submitAPI);