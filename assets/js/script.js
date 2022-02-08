let currentForecast = function(location, data) {
    let city = document.querySelector('#city');
    let temp = document.querySelector('#temp');
    let wind = document.querySelector('#wind');
    let humidity = document.querySelector('#humid');

    city.textContent = location;
    temp.textContent = data.main.temp + '°F';
    wind.textContent = data.wind.speed + 'mph';
    humidity.textContent = data.main.humidity + '%';
};