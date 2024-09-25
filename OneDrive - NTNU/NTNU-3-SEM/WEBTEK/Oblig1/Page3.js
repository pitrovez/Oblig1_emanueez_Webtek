const locations = [
    { name: 'Tokyo, Japan', latitude: 35.6895, longitude: 139.6917 },
    { name: 'London, UK', latitude: 51.5085, longitude: -0.1257 },
    { name: 'Paris, France', latitude: 48.8534, longitude: 2.3488 },
    { name: 'Oslo, Norway', latitude: 59.9127, longitude: 10.7461 },
    { name: 'Gjøvik, Norway', latitude: 60.7957, longitude: 10.6915 },
    { name: 'Bergen, Norway', latitude: 60.393, longitude: 5.3242 },
    { name: 'Alta, Norway', latitude: 69.9689, longitude: 23.2717 },
];

const weatherContainer = document.getElementById('weather-container');

function fetchWeather() {
    // Clear previous weather details
    weatherContainer.innerHTML = '';

    locations.forEach(location => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const weatherElement = document.createElement('div');
                weatherElement.classList.add('weather');
                weatherElement.innerHTML = `
                    <h3>${location.name}</h3>
                    <p>Temperature: ${data.current_weather.temperature}°C</p>
                    <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
                `;
                weatherContainer.appendChild(weatherElement);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
}

// Fetch weather data initially
fetchWeather();

//can change the second argument to change the interval, now it is 10 seconds (10000ms)
setInterval(fetchWeather, 10000);