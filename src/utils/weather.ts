/**
 * Weather Service
 *
 * OpenWeatherMap API
 * WeatherAPI
 * Also consider Open-Meteo?
 *
 * @todo Implement non-US location parameters
 * @todo Implement lat, lon lookup for location string
 */
import axios from 'axios';

import { config } from '../config/config';

/**
 * Current Weather Request from Weather API
 *
 * @example
 * const temp = getCurrentWeather('10038').then(res => console.log(res));
 * @param {string} location
 * @return {Promise<CurrentWeather>}
 * @link https://www.weatherapi.com/docs/
 */
export const getCurrentWeatherNew = async (location: string) => {
  const apikey = config.env.WEATHERAPI_API_KEY;
  const path = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}"`;

  console.log('Sending Current Weather request to Weather API at:');
  console.log(path);
  console.log('...');

  const response = await axios.get(path);
  return response.data;
}

/**
 * Weather Forecast Request from Weather API
 *
 * @example
 * const temp = getForecast('10038').then(res => console.log(res));
 * @param {string} zipcode
 * @returns {Promise<CurrentWeather>}
 * @link https://www.weatherapi.com/docs/
 */
export const getForecastNew = async (zipcode: string) => {
  const apikey = config.env.WEATHERAPI_API_KEY;
  const days = 2;
  // const cnt = 0;  // number of timestamps to return
  const path = `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${zipcode}&days=${days}`;

  console.log('Sending Weather Forecast request to Weather API at:');
  console.log(path);
  console.log('...');

  const response = await axios.get(path);

  return response.data;
}

/**
 * Weather Forecast Request from OpenWeatherMap API
 *
 * @example
 * const temp = getForecast('10038').then(res => console.log(res));
 * @param {string} zipcode
 * @returns {Promise<CurrentWeather>}
 * @link https://openweathermap.org/forecast5#name5
 * @link https://openweathermap.org/forecast5#cityid5
 * @link https://openweathermap.org/api/geocoding-api
 */
export const getForecast = async (zipcode: string) => {
  const apikey = config.env.OPENWEATHER_API_KEY;
  const units = 'imperial';
  // const cnt = 0;  // number of timestamps to return
  const path = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${apikey}&units=${units}`;

  const response = await axios.get(path);

  return response.data;
}

/**
 * Current Weather Request from OpenWeatherMap API
 *
 * @example
 * const temp = getCurrentWeather('10038').then(res => console.log(res));
 * @param {string} zipcode
 * @return {Promise<CurrentWeather>}
 * @link https://openweathermap.org/current#name
 * @link https://openweathermap.org/current#cityid
 * @link https://openweathermap.org/api/geocoding-api
 */
export const getCurrentWeather = async (zipcode: string) => {
  const apikey = config.env.OPENWEATHER_API_KEY;
  const units = 'imperial';
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apikey}&units=${units}`;

  const response = await axios.get(path);
  return response.data;
}
