import * as irc from 'irc-upd';
import * as c from 'irc-colors';

import { config } from './config/config';

import { Bot } from './bot';

import { getCurrentWeather, getForecast } from './utils/weather';

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
        console.log(res);

        let msg = c.bold('Current Weather - ' + res.name + ': ')
          + res.weather[0].main + ' ' + res.main.temp + '°F; '
          + c.bold('Feels Like: ') + res.main.feels_like + '°F; '
          + c.bold('Humidity: ') + res.main.humidity + '%; '
          + c.bold('Pressure: ') + res.main.pressure + 'hPa; '
          + c.bold('High: ') + res.main.temp_max + '°F; '
          + c.bold('Low: ') + res.main.temp_min + '°F; '
          + c.bold('Wind: ') + res.wind.speed + 'mph at ' + res.wind.deg + '°';
          // + ' — ' + c.italic();
        bot.say(to, msg);
        // bot.say(to, `Current: ${res.weather[0].main} ${res.main.temp}°F; Feels Like: ${res.main.feels_like}°F; Humidity: ${res.main.humidity}%; Pressure: ${res.main.pressure}hPa; High: ${res.main.temp_max}; Low: ${res.main.temp_min}; Wind: ${res.wind.speed}mph at ${res.wind.deg}° - ${res.name}`)
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
