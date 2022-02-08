let currentForecast = function(location, data) {
    let city = document.querySelector('#city');
    let temp = document.querySelector('#temp');
    let wind = document.querySelector('#windSpeed');
    let humidity = document.querySelector('#humid');

    city.textContent = location;
    temp.textContent = data.main.temp + '°F';
    wind.textContent = data.wind.speed + 'mph';
    humidity.textContent = data.main.humidity + '%';
};

let submitAPI = function(event) {
    event.preventDefault();
    let apiUrl ='http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=bc541e0acdc6372acb78d3865f34ac3b';
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
            currentForecast(location, data);
            })
        }
        else {
            console.log('The city you searched does not exist, please try again.');
        }
    }); 
};
document.querySelector('#searchBtn').addEventListener('click', function() {
    let input = document.querySelector('#city').value;
    input.textContent = "PLACEHOLDER";
    formSubmit();
});