// weather.js

async function fetchWeatherData() {
    try {
        // Step 1: Fetch user's IP address
        const ipResponse = await fetch('https://ifconfig.me/ip');
        if (!ipResponse.ok) throw new Error('Failed to fetch IP address');
        const ip = await ipResponse.text();

        // Step 2: Fetch weather data
        const weatherResponse = await fetch(`https://wttr.in/${ip}?format=j1`);
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
        const weatherData = await weatherResponse.json();

        // Step 3: Extract relevant information
        const weatherDescription = weatherData.current_condition[0].weatherDesc[0].value;
        const tempC = weatherData.current_condition[0].temp_C;
        const tempF = weatherData.current_condition[0].temp_F;
        const city = weatherData.nearest_area[0].areaName[0].value;
        const state = weatherData.nearest_area[0].region[0].value;
        const country = weatherData.nearest_area[0].country[0].value;
        const moonPhase = weatherData.weather[0].astronomy[0].moon_phase;

        // Return the data for use in templates
        return { weatherDescription, tempC, tempF, city, state, country, moonPhase, ipResponse};
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null; // Return null if there's an error
    }
}

// Export the function to be used globally
window.fetchWeatherData = fetchWeatherData;