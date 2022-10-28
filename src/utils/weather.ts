/**
 * OpenWeatherMap API Service
 *
 * Also consider Open-Meteo?
 *
 * @link https://openweathermap.org/current
 * @link https://openweathermap.org/api/geocoding-api
 * @todo Implement non-US location parameters
 * @todo Implement lat, lon lookup for location string
 */
import axios from 'axios';

import { config } from '../config/config';

/**
 * Current Weather Request
 *
 * @example
 * const temp = getCurrentWeather('10038').then(res => console.log(res));
 * @param {string} zipcode
 * @return {Promise<CurrentWeather>}
 */
export const getCurrentWeather = async (zipcode: string) => {
  const apikey = config.env.OPENWEATHER_API_KEY;
  const units = 'imperial';
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apikey}&units=${units}`;

  const response = await axios.get(path);
  return response.data;
}

/**
 * Weather Forecast Request
 * @example
 * const temp = getForecast('10038').then(res => console.log(res));
 * @param {string} zipcode
 * @returns
 */
export const getForecast = async (zipcode: string) => {
  const apikey = config.env.OPENWEATHER_API_KEY;
  const units = 'imperial';
  // const cnt = 0;  // number of timestamps to return
  const path = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${apikey}&units=${units}`;

  const response = await axios.get(path);

  return response.data;
}
