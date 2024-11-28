import axios from 'axios';

const API_KEY = '7e439b2576c8e7a2d3c434f8b6d3134b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};