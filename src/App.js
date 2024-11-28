import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchWeather } from './api';

function App() {
  const [city, setCity] = useState('Toronto'); // set Toronto as default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const currentDate = new Date().toLocaleString('en-US', options);
    return currentDate;
  };

  const currentDate = getCurrentDate();

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      const data = await fetchWeather(city);
      setWeather(data);
      setLoading(false);
    };

    getWeather();
  }, [city]); // Fetches the data whenever the 'city' input changes

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="current-date-time">
        <p>{currentDate}</p>
      </div>
      <input 
        type="text" 
        value={city} 
        onChange={handleCityChange} 
        placeholder="Enter city" 
      />
      {loading && <p>Loading...</p>}
      {weather && !loading && (
        <div className="Output">
          <h2 className="Output_City_Name">{weather.name}</h2>
          <div className="Output_Name_Description">
            <p>{weather.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
          <div className="Output_Temp_Humidty_WindSpeed">
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}

      {weather === null && !loading && <p>No weather data found for "{city}". Please check the city name.</p>}
    </div>
  );
}

export default App;
