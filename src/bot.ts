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
