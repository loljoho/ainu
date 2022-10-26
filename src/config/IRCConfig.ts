/**
 * Interface for IRC Client configuration
 *
 * @doc https://node-irc-upd.readthedocs.io/en/stable/API.html#client
 */
export interface IRCConfig {
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
