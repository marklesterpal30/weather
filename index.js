document.addEventListener('DOMContentLoaded', () => {
    const myApiKey = 'b2c065ff3d341a949c62a5bf271dbef0';
    const btnSearch = document.getElementById('btnSearch');
    const h1Celcius = document.getElementById('h1Celcius');
    const temperatureDescription = document.getElementById('temperatureDescription');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
    const spinners = document.querySelectorAll('.spinner'); // Assume you have a spinner element
    var weatherPic = document.getElementById('weatherPic');

    btnSearch.addEventListener('click', async () => {
        const cityName = document.getElementById('cityName').value;
        const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApiKey}`;

        // Show the spinner
        spinners.forEach(spinner => {
            spinner.classList.remove('hidden');
            spinner.classList.add('flex');
        });

        // Hide all data initially
        h1Celcius.classList.add('hidden');
        temperatureDescription.classList.add('hidden');
        humidity.classList.add('hidden');
        windSpeed.classList.add('hidden');

        try {
            const response = await fetch(apiCall);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            console.log(data);

            const kelvin = data.main.temp;
            const celsius = kelvin - 273.15;
            h1Celcius.textContent = `${celsius.toFixed(0)}°C`;
            temperatureDescription.textContent = data.weather[0].description;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed} Km/H`;

            // Show all data
            h1Celcius.classList.remove('hidden');
            temperatureDescription.classList.remove('hidden');
            humidity.classList.remove('hidden');
            windSpeed.classList.remove('hidden');

            if (data.weather[0].description ==  'clear sky') {
                weatherPic.src = 'clear.png'; // For very high temperatures, which might be uncommon for heavy rain but fits the pattern you have
            } else if (data.weather[0].description ==  'light rain') {
                weatherPic.src = 'rainy.png'; // For high temperatures where rain might occur
            } else if (data.weather[0].description ==  'heavy intensity rain') {
                weatherPic.src = 'heavyrain.png'; // For moderate temperatures where cloudiness is more common
            }else if (data.weather[0].description ==  'overcast clouds') {
            weatherPic.src = 'cloudy.png'; // For moderate temperatures where cloudiness is more common
             } else if (data.weather[0].description ==  'few clouds') {
                weatherPic.src = 'cloudy.png'; // For moderate temperatures where cloudiness is more common
            } else if (data.weather[0].description ==  'scattered clouds') {
                weatherPic.src = 'cloudy.png'; // For moderate temperatures where cloudiness is more common
            } else if (data.weather[0].description ==  'thunderstorm') {
                weatherPic.src = 'heavyrain.png'; // For moderate temperatures where cloudiness is more common
            } else if (data.weather[0].description ==  'light intensity shower rain') {
                weatherPic.src = 'rainy.png'; // For moderate temperatures where cloudiness is more common
            } else if (data.weather[0].description ==  'moderate rain') {
                weatherPic.src = 'rainy.png'; // For moderate temperatures where cloudiness is more common
            } 
              else {
                weatherPic.src = 'clear.png'; // For cooler temperatures that are less likely to have cloudiness or rain
            }



        } catch (error) {
            // Handle error by displaying a message
            h1Celcius.textContent = error.message;
            temperatureDescription.classList.add('hidden');
            humidity.classList.add('hidden');
            windSpeed.classList.add('hidden');
            h1Celcius.classList.remove('hidden'); // Ensure the error message is visible
        } finally {
            // Hide the spinner after data is fetched or an error occurs
            spinners.forEach(spinner => {
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');
            });
        }
    });
});
