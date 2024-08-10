async function getWeather() {
    event.preventDefault();

    const location = (document.getElementById('location').value);
    const weather = document.querySelector("#weatherDisplay");
    const apiKey = "RRE4LD43NQNBBAM9SBAH3BJ9X";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        weather.innerHTML = '';

        const weatherDisplay = `
            <h2>Weather in ${data.resolvedAddress}</h2>
            <p>Temperature: ${data.currentConditions.temp}°C</p>
            <p>Condition: ${data.currentConditions.conditions}</p>
        `
        weather.innerHTML = weatherDisplay;
    } catch (error){
        weather.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
        console.error('There has been a problem with your fetch operation:', error);
    }

}

//on submitting form,

document.getElementById("weather").onsubmit = getWeather;