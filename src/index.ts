import * as irc from 'irc-upd';
import config from './config/config';

/**
 * Connection
 */
const bot = new irc.Client(config.irc.server, config.irc.nick, config.irc.options)

/**
 * Event Listeners
 *
 * @docs https://node-irc-upd.readthedocs.io/en/stable/API.html#events
 */
// Listen for errors
bot.addListener('error', function (message: string) {
  console.log('error: ', message);
});

// Listen for `!weather` command in channel messages
bot.addListener('message#', function (nick: string, to: string, text: string, message: string) {
  let msgArr = text.split(' ');
  let cmd = msgArr[0];
  let location = msgArr[1];
  if (cmd === '!weather' || cmd === '!we') {
    bot.say(to, `How would I know what the weather's like in ${location}?`);
  }
});

// Listen for `!test` command in channel messages
bot.addListener('message#', function (nick: string, to: string, text: string, message: string) {
  if (text === '!debug') {
    bot.say(to, `${nick} says in ${to}: ${text} (${message})`);
  }
});

// Listen for `ainu` mentioned in channel messages
bot.addListener('message#', function (nick: string, to: string, text: string, message: string) {
  const regex = /.*?ainu.*?/;
  const found = text.match(regex);
  if (found && Math.random() < 0.25) {
    bot.say(to, `What did you say about me?`);
  }
});

// Listen for joins
bot.addListener('join', function (channel: string, nick: string) {
  // Welcome them in!
  if (nick !== 'ainu') {
    bot.say(channel, `Henlo, ${nick}!`);
  }
});

// Listen for parts
bot.addListener('part', function (channel: string, nick: string) {
  // Bid them adieu!
  bot.say(channel, `Goodbye, ${nick}!`);
});

// Listen for `!quit` command messages
bot.addListener('message', function (nick: string, to: string, text: string, message: string) {
  if (text === '!quit' && nick === 'cars') {
    bot.say(to, `${nick} hates me.`)
    bot.disconnect();
  }
});

// Display messages in console
bot.addListener('message', function (nick: string, to: string, text: string, message: string) {
  // console.log(nick + ' => ' + to + ': ' + text);
  console.log(`${to}\t<${nick}> ${text}`);
});
