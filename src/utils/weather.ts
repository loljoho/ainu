/**
 * OpenWeatherMap API Service
 *
 * Also consider Open-Meteo?
 *
 * @link https://openweathermap.org/current
 * @link https://openweathermap.org/api/geocoding-api
 */
import axios from 'axios';

import { config } from '../config/config';

/**
 * Current Weather Request
 *
 * @example
 * const temp = getCurrentWeather('08551').then(res => console.log(res));
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

export const getForecast = async (zipcode: string) => {
  const apikey = config.env.OPENWEATHER_API_KEY;
  // const units = 'imperial';
  const path = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=${apikey}`;

  const response = await axios.get(path);

  return response.data;
}
