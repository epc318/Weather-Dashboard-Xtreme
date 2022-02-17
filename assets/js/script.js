let getCurrentForecast = function(data, i) {
    let projTemp = document.querySelectorAll('#projectedTemp');
    let recentTemp = projTemp[projTemp.length - 1];
    recentTemp.textContent = data.daily[i].temp.day + ' °F';
    let projWind = document.querySelectorAll('#projectedWind');
    let recentWind = projWind[projWind.length - 1];
    recentWind.textContent = data.daily[i].wind + ' mph';
    let projHum = document.querySelectorAll('#projectedHum');
    let recentHum = projHum[projHum.length - 1];
    recentHum.textContent = data.daily[i].humid + '%';
};

let insertInset = function(data, i) {
    if(!i) {i = 0;};
    let insetID = data.daily[i].weather[0].icon;
    let insetURL = 'https://openweathermap.org/img/w/' + insetID + '.png';

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
        forecastInfo.id= 'projectedForecast';
        results.appendChild(forecastInfo);   
        for(let i = 0; i < 5; i++) {
            let weatherByDay = document.createElement('div');
            weatherByDay.classList = 'placeholder';
            forecastInfo.appendChild(weatherByDay);

            let nextWeek = document.createElement('h3');
            nextWeek.id = 'next5Days';
            nextWeek.textContent = moment().add(i + 1,'days').format('dddd, MMMM Do YYYY');
            weatherByDay.appendChild(nextWeek);

            let weatherInset = document.createElement('img');
            weatherInset.src = insertInset(data, i);
            weatherByDay.appendChild(weatherInset);
                for(let j = 0; j < 3; j++) {
                let h5 = document.createElement('h4');
                let projectedInfo = document.createElement('div');
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

let uvIndex = function(data) {
    let uvIndex = data.current.uvIndex;
    let index;
        if(uvIndex < 3) {
        index = 'fair';
    }
    else if(uvIndex > 5) {
        index = 'beware';
    }
    else if(5 > uvIndex > 3){
        index = 'sunny but doable';
    }
    return index;
};

let getForecastSections = function(data) {
    let sectionDayCards = document.querySelector('#results');
    let sectionTodaysForecast = document.createElement('div');
    sectionTodaysForecast.id = 'todaysForecast';
    sectionDayCards.appendChild(sectionTodaysForecast);

    let sectionHeader = document.createElement('div');
    sectionHeader.className = 'forecastInset';
    sectionTodaysForecast.appendChild(sectionHeader);

    let sectionTitle = document.createElement('h1');
    sectionTitle.id = 'location';
    let weatherInset = document.createElement('img');
    weatherInset.id = 'inset';
    sectionHeader.appendChild(sectionTitle);
    sectionHeader.appendChild(weatherInset);

    let todaysDate = document.createElement('h4');
    todaysDate.id = 'currentDate';
    todaysDate.textContent = moment().format('dddd, MMMM Do YYYY,');
    sectionTodaysForecast.appendChild(todaysDate);

        for(let i = 0; i < 4; i++) {
            let h5 = document.createElement('h5');
            let projectedInfo = document.createElement('div');
                if(i < 1) {
                    h5.textContent =  'Temperature: ';
                    projectedInfo.id = 'temp';
                } 
                else if(i == 1) {
                    h5.textContent = 'Wind Speed: ';
                    projectedInfo.id = 'wind';
                }
                else if(i == 2)  {
                    h5.textContent = 'Relative Humidity (%): ';
                    projectedInfo.id = 'humid';
                }
                else {
                h5.textContent = 'UV Index: '
                projectedInfo.className = uvIndex(data);
                projectedInfo.id = 'uvindex';
            }
            sectionTodaysForecast.appendChild(h5);
            h5.appendChild(projectedInfo);
        }
};

let currentForecast = function(location, data) {
    let cards = document.querySelector("#results");
    if(cards.children.length < 1) {
        getForecastSections(data);
    }
    let city = document.querySelector('#location');
    let temp = document.querySelector('#temp');
    let wind = document.querySelector('#wind');
    let humidity = document.querySelector('#humid');
    let uvi = document.querySelector("#uvindex");

    let inset = document.querySelector('#inset');

    city.textContent = location.charAt(0).toUpperCase() + location.slice(1);
    inset.src = insertInset(data);
    temp.textContent = data.current.temp + '°F';
    wind.textContent = data.current.wind + ' mph';
    humidity.textContent = data.current.humid + '%';
    uvi.textContent = data.current.uvIndex;
};



let fetchError = function() {
    let inputLocal = document.querySelector('#location');
    inputLocal.value = 'Data Retrieval Error, Please Try Again.';
}; 


let cityLatLong = function(location, data) {
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    let apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly&units=imperial&appid=bc541e0acdc6372acb78d3865f34ac3b';


    fetch(apiURL).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                currentForecast(location, data);
                getProjectedForecast(data);
            })
        }
        else {
            fetchError();
        }
    })
};

let getStartupInfo = function(location) {
    let apiURL2 = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=bc541e0acdc6372acb78d3865f34ac3b';
    fetch(apiURL2).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            cityLatLong(location, data);
            })
        }
        else {
            fetchError();
        }
    }); 
}

let submitAPI = function(event) {
    event.preventDefault();
    let location = document.querySelector('#location').value;
    getStartupInfo(location);
};

document.querySelector('#searchBtn').addEventListener('click', submitAPI);