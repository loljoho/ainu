/**
 * Weather Services
 *
 * Weather API
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
export const getCurrentWeather = async (location: string) => {
  const apikey = config.env.WEATHERAPI_API_KEY;
  const path = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${location}"`;

  console.log('Sending Current Weather request to Weather API at:');
  console.log(path);

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
export const getForecast = async (zipcode: string) => {
  const apikey = config.env.WEATHERAPI_API_KEY;
  const days = 2;
  // const cnt = 0;  // number of timestamps to return
  const path = `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${zipcode}&days=${days}`;

  console.log('Sending Weather Forecast request to Weather API at:');
  console.log(path);

  const response = await axios.get(path);

  return response.data;
}
