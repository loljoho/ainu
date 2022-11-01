import * as irc from 'irc-upd';
import * as c from 'irc-colors';
import { config } from './config/config';

import { Bot } from './bot';

import {
  getCurrentWeather,
  getForecast,
  getCurrentWeatherNew,
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
    // getCurrentWeather(zip)
    //   .then(res => {
    //     console.log(res);

    //     let msg = c.bold('Current Weather - ' + res.name + ': ')
    //       + res.weather[0].main + ' ' + res.main.temp + '°F; '
    //       + c.bold('Feels Like: ') + res.main.feels_like + '°F; '
    //       + c.bold('Humidity: ') + res.main.humidity + '%; '
    //       + c.bold('Pressure: ') + res.main.pressure + 'hPa; '
    //       + c.bold('High: ') + res.main.temp_max + '°F; '
    //       + c.bold('Low: ') + res.main.temp_min + '°F; '
    //       + c.bold('Wind: ') + res.wind.speed + 'mph at ' + res.wind.deg + '°';
    //     bot.say(to, msg);
    //   });
      getCurrentWeatherNew(zip)
        .then(res => {
          console.log(res)
          const separator = ' · ';
          // const separator = '; ';

          // @TODO create utility function for this —
          let msg = nick + ': Current Weather in '
            + c.bold.purple(res.location.name + ', ' + res.location.region) + ' — '
            + res.current.condition.text + ', '
            + res.current.temp_f + '°F (' + res.current.temp_c + '°C)'
            + separator + c.bold('Feels Like: ') + res.current.feelslike_f + '°F (' + res.current.feelslike_c + '°C)'
            + separator + c.bold('Humidity: ') + res.current.humidity + '%'
            + separator + c.bold('Wind: ') + res.current.wind_mph + 'mph (' + res.current.wind_kph + 'kph) ' + res.current.wind_dir + ''
            + separator + c.bold('Pressure: ') + res.current.pressure_mb + 'mb (' + res.current.pressure_in + '″Hg)'
            + separator + c.bold('Precip: ') + res.current.precip_mm + 'mm (' + res.current.precip_in + 'in)'
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
        console.log(res);
        let msg = `Ohnoes`;
        msg += '!';
        bot.say(to, msg);
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
