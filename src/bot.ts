import { Client } from 'irc-upd';

import { messageLogHandler } from './logger';

interface IRCConfig {
  userName: string;
  realName: string;
  port: number;
  localAddress?: number;
  debug: boolean;
  showErrors: boolean;
  autoRejoin: boolean;
  autoConnect: boolean;
  channels: string[];
  secure: boolean;
  selfSigned: boolean;
  certExpired: boolean;
  floodProtection: boolean;
  floodProtectionDelay: number;
  sasl: boolean;
  retryCount: number;
  retryDelay: number;
  stripColors: boolean;
  channelPrefixes: string;
  messageSplit: number;
  encoding?: string;
}

export class Bot extends Client {

  constructor(server: string, nick: string, options: IRCConfig) {
    super(server, nick, options);

    // Add handler for error listener
    super.addListener('error', (message: string) => {
      console.log('ERROR', message);
    });

    // Add handler for message logger
    super.addListener('message', messageLogHandler);

    // Add handler for join/part/quit commands
    this.addServerCommands();
    // Add handler for points inc/dec with ++/--
    this.addPointsCommands();
  }

  /**
   * Add increment/decrement points commands handlers
   *
   * @TODO fix `say(to)` for this
   * @TODO create dedicated points module
   */
  addPointsCommands() {
    super.addListener('message#', (nick: string, to: string, text: string) => {
      const regexInc = /^(.+)\+\+$/;
      const regexDec = /^(.+)--$/;
      const item = text.slice(0, text.length - 2);
      if (regexInc.exec(text)) {
        super.say(to, `${item}'s points have increased by 1.`);
      } else if (regexDec.exec(text)) {
        super.say(to, `${item}'s points have decreased by 1.`);
      }
    });
  }

  /**
   * Add Join/Part/Quit command handlers
   */
  addServerCommands() {
    super.addListener('message', (nick: string, to: string, text: string) => {

      // split `text` into array of [cmd, param]
      const txtArr = text.split(' ');
      const cmd = txtArr[0];
      const param = txtArr[1];

      // autoformat channel string
      let chan = param;
      if (chan && chan[0] !== '#') {
        chan = `#${param}`;
      }

      if (nick === 'cars') {
        // handle !join command
        if (cmd === '!join') {
          super.join(chan);
        }
        // handle !part command
        if (cmd === '!part') {
          if (param === undefined) {
            super.part(to);
          } else {
            super.part(chan);
          }
        }
        // handle !quit command
        if (cmd === '!quit') {
          super.disconnect();
        }
      }
    });
  }

  /**
   * Add standard custom commands
   */
  addCommand(
    text: string,
    func: (nick: string, to: string, text: string, message: string) => void,
    event = 'message'
  ) {
    super.addListener(event, func);
  }

}
