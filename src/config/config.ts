/**
 * Application Configuration
 *
 * @TODO refactor as obj/interface with extra files
 * @TODO add database config
 * @TODO add other config
 */
import * as dotenv from 'dotenv';
dotenv.config();

// import { IRCConfig } from './IRCConfig';

export const config = {
  env: process.env,
  irc: {
    server: 'irc.snoonet.org',
    nick: 'ainu',
    options: {
      userName: 'ainu',
      realName: 'ainu',
      password: process.env.NICKSERV_PASS,
      port: 6667,
      // localAddress: null,
      debug: false,
      showErrors: true,
      autoRejoin: false,
      autoConnect: true,
      channels: ['#ainu'],
      secure: false,
      selfSigned: false,
      certExpired: false,
      floodProtection: false,
      floodProtectionDelay: 1000,
      sasl: true,
      retryCount: 3,
      retryDelay: 5000,
      stripColors: false,
      channelPrefixes: "&#",
      messageSplit: 512,
      // encoding: null
    }
  }
};
