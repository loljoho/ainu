import * as irc from 'irc-upd';
import * as c from 'irc-colors';
import { config } from './config/config';

import { Bot } from './bot';

import {
  getCurrentWeather,
  getForecast,
} from './utils/weather';

/**
 * Connection
 */
// const bot = new irc.Client(config.irc.server, config.irc.nick, config.irc.options)
const bot = new Bot(config.irc.server, config.irc.nick, config.irc.options)

/**
 * Event Listeners
 *
 * @docs https://node-irc-upd.readthedocs.io/en/stable/API.html#events
 */

/**
 * Debug Commands
 */
bot.addCommand('!debug', (nick: string, to: string, text: string, message: string) => {
  const cmd = text.split(' ')[0];
  if (cmd === '!debug') {
    console.log(`Detected command ${cmd} in ${to}`);
    bot.say(to, `${nick} says in ${to}: ${text} (${message})`);
  }
}, 'message#');

/**
 * Listen for weather command in channel messages
 */
bot.addListener('message#', function (nick: string, to: string, text: string) {
  const m = text.split(' ');
  const cmd = m[0];
  const zip = m[1];
  if (cmd === '!weather' || cmd === '!we') {
    getCurrentWeather(zip)
      .then(res => {
        console.log('\n\nres:', res)
        const separator = ' · ';
        // const separator = '; ';

        /**
         * Construct message string for Weather command
         *
         * @TODO refactor into external function(s)
         * @TODO refactor with template literals
         * @TODO allow users to supply parameters for additional values
         */
        let msg = '(' + nick + ') Current Weather for ';

        // append location
        let country = res.location.country;
        if (country.includes('United States')) {
          country = 'USA';
        } else if (country.includes('Taiwan')) {
          country = 'Formosa';
        }
        msg += c.bold.navy(res.location.name + ', ' + res.location.region + ', ' + country) + ' — ';

        // append condition text
        msg += res.current.condition.text + ', ';

        // append weather values
        msg += res.current.temp_f + '°F (' + res.current.temp_c + '°C)'
          + separator + c.bold('Feels Like: ') + res.current.feelslike_f + '°F (' + res.current.feelslike_c + '°C)'
          + separator + c.bold('Humidity: ') + res.current.humidity + '%'
          + separator + c.bold('Wind: ') + res.current.wind_mph + 'mph (' + res.current.wind_kph + 'kph) ' + res.current.wind_dir + ''
          + separator + c.bold('Pressure: ') + res.current.pressure_mb + 'mb (' + res.current.pressure_in + '″Hg)'
          + separator + c.bold('Precip: ') + res.current.precip_in + 'in (' + res.current.precip_mm + 'mm)'
          + ' — (' + c.italic('Updated ' + res.current.last_updated) + ')'
          // + c.bold('Clouds: ') + res.current.cloud + '%'
          // + c.bold('Visibility: ') +res.current.vis_miles + 'mi (' +res.current.vis_km + 'km)'
          // + c.bold('Gusts: ') + res.current.gust_mph + 'mph (' + res.current.gust_kph + 'kph)'
          // + c.bold('UV: ') + res.current.uv

        console.log('Message string `msg`:', msg);
        bot.say(to, msg);

      });
  }
  else if (cmd === '!forecast' || cmd === '!fc') {
    getForecast(zip)
      .then(res => {
        console.log('\n\nres:', res);
        console.log('\n\nres.forecast:', res.forecast);
        const separator = ' · ';
        const days = res.forecast.forecastday;

        /**
         * Construct message string for Forecast command
         *
         * @TODO refactor into external function(s)
         * @TODO refactor with template literals
         * @TODO allow users to supply parameters for different days
         */
        let msg = '(' + nick + ') Daily Forecast for ';
        // + c.bold.blue(days[0].date) + ' in '

        // append location
        let country = res.location.country;
        if (country.includes('United States')) {
          country = 'USA';
        } else if (country.includes('Taiwan')) {
          country = 'Formosa';
        }
        msg += c.bold.navy(res.location.name + ', ' + res.location.region + ', ' + country) + ' — ';
        // append condition text
        msg += days[0].day.condition.text + ', ';

        // append weather values
        msg += days[0].day.avgtemp_f + '°F (' + days[0].day.avgtemp_c + '°C)'
          + separator + c.bold('High: ') + days[0].day.maxtemp_f + '°F (' + days[0].day.maxtemp_c + '°C)'
          + separator + c.bold('Low: ') + days[0].day.mintemp_f + '°F (' + days[0].day.mintemp_c + '°C)'
          + separator + c.bold('Humidity: ') + days[0].day.avghumidity + '%'
          + separator + c.bold('Wind: ') + days[0].day.maxwind_mph + 'mph (' + days[0].day.maxwind_kph + 'kph)'
          + separator + c.bold('Precip: ') + days[0].day.totalprecip_in + 'in (' + days[0].day.totalprecip_mm + 'mm)'
        if (days[0].day.daily_chance_of_rain > 0) {
          msg += separator + c.bold('Chance of Rain: ') + days[0].day.daily_chance_of_rain + '%'
        }
        if (days[0].day.daily_chance_of_snow > 0) {
          msg += separator + c.bold('Chance of Snow: ') + days[0].day.daily_chance_of_snow + '%'
        }

        msg += separator + c.bold('Sunrise: ') + days[0].astro.sunrise + separator + c.bold('Sunset: ') + days[0].astro.sunset

        console.log('Message string `msg`:', msg);
        bot.say(to, msg);


        // const separator = '; ';

        // @TODO create utility function for this —
      });
  }
});

/**
 * Listen for `ainu` iin channel messages
 */
bot.addListener('message#', function (nick: string, to: string, text: string, message: string) {
  const regex = /.*?ainu.*?/;
  const found = text.match(regex);
  const messages = [`What did you say about me?`, `Say that again, ${nick}?`, `Excuse me?`, `Pardon?`, `You rang, ${nick}?`];
  if (found && Math.random() < 0.25) {
    const i = Math.floor(Math.random() * messages.length);
    bot.say(to, messages[i]);
  }
});

/**
 * Listen for channel joins
 */
// bot.addListener('join', function (channel: string, nick: string) {
//   bot.say(channel, `Henlo, ${nick}!`);
// });

/**
 * Listen for channel parts
 */
// bot.addListener('part', function (channel: string, nick: string) {
//   bot.say(channel, `Goodbye, ${nick}!`);
// });
