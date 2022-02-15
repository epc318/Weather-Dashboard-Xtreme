let getCurrentForecast = function(data, i) {
    let projTemp = document.querySelectorAll('#projectedTemp');
    let recentTemp = projTemp[projTemp.length - 1];
    recentTemp.textContent = data.daily[i].temp.day + "°F";
    let projWind = document.querySelectorAll("#projectedWind");
    let recentWind = projWind[projWind.length - 1];
    recentWind.textContent = data.daily[i].wind_speed + "mph";
    let projHum = document.querySelectorAll("#projectedHum");
    let recentHum = projHum[projHum.length - 1];
    recentHum.textContent = data.daily[i].humidity + "%";
};

let insertInset = function(data, i) {
    if(!i) {i = 0;};
    let insetID = data.current.weather[0].inset;
    let insetURL = 'https://openweathermap.org/img/w/'+insetID+'.png';
    return insetURL;
};

let getProjectedForecast = function(data) {
    let ask = document.querySelector('#projectedForecast');
    if(ask) {
        ask.remove();
        getProjectedForecast(data);
    }
    else {
        let results = document.querySelector('#results');
        let forecastInfo = document.createElement('div');
        forecastInfo.id= 'projeectedForecast';
        results.appendChild(forecastInfo);   
        for(let i = 0; i < 5; i++) {
            let weatherByDay = document.createElement('div');
            weatherByDay.classList = '';
            forecastInfo.appendChild(weatherByDay);

            let nextWeek = document.createElement('h3');
            nextWeek.id = 'next5Days';
            nextWeek.textContent = 'Wednesday, February' + (9 + i);
            forecastInfo.appendChild(nextWeek);
                for(let j = 0; j < 3; j++) {
                let h5 = document.createElement('h4');
                let projectedInfo = document.createElement('span');
                if(j < 1) {
                    h5.textContent =  'Temperature: ';
                    projectedInfo.id = 'projectedTemp';
                } 
                else if(j > 1) {
                    h5.textContent = 'Wind Speed: ';
                    projectedInfo.id = 'projectedWind';
                } 
                else {
                    h5.textContent = 'Relative Humidity (%): ';
                    projectedInfo.id = 'projectedHum';
                }
                forecastInfo.appendChild(h5);
                h5.appendChild(projectedInfo);
             };
             getCurrentForecast(data, i);
        };
    }       
};

let currentForecast = function(location, data) {
    let city = document.querySelector('#city');
    let temp = document.querySelector('#temp');
    let wind = document.querySelector('#windSpeed');
    let humidity = document.querySelector('#humid');

    let inset = document.querySelector('#inset');

    city.textContent = location;
    inset.src = insetURL
    temp.textContent = data.present.temp + '°F';
    wind.textContent = data.present.speed + 'mph';
    humidity.textContent = data.present.humidity + '%';
};



let apiError = function() {
    let inputLocal = document.querySelector("#location");
    inputLocal.value = "Data Retrieval Error, Please Try Again.";
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