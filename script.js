// API Configuration
const apiKey = "60c5d32af585c2cba7159e8b6f3205a6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

// DOM Elements
const elements = {
    search: document.getElementById('locationSearch'),
    searchBtn: document.getElementById('searchButton'),
    location: document.getElementById('location'),
    description: document.getElementById('description'),
    temperature: document.getElementById('temperature'),
    highTemp: document.getElementById('highTemp'),
    lowTemp: document.getElementById('lowTemp'),
    wind: document.getElementById('wind'),
    humidity: document.getElementById('humidity')
};

// Fetch Weather Data
async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Error fetching weather data. Please try again.');
    }
}


function updateUI(weatherData) {
    elements.location.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    elements.temperature.textContent = Math.round(weatherData.main.temp);
    elements.highTemp.textContent = Math.round(weatherData.main.temp_max);
    elements.lowTemp.textContent = Math.round(weatherData.main.temp_min);
    elements.wind.textContent = `${Math.round(weatherData.wind.speed * 3.6)} km/h`; 
    elements.humidity.textContent = `${weatherData.main.humidity}%`;
    elements.description.textContent = 
        weatherData.weather[0].description.charAt(0).toUpperCase() + 
        weatherData.weather[0].description.slice(1);
}


function handleSearch() {
    const location = elements.search.value.trim();
    if (location) {
        getWeatherData(location);
        elements.search.value = '';
    }
}

function initializeEventListeners() {
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.search.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function initializeApp() {
    initializeEventListeners();
    getWeatherData('Sao Paulo');
}

document.addEventListener('DOMContentLoaded', initializeApp);