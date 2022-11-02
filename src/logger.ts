import dayjs, { type Dayjs } from 'dayjs';

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * @TODO Refactor and allow for disabling message logging
 */
export function messageLogHandler(nick: string, to: string, text: string, message: string) {
  // Do not log the `NO_LOG_CHAN`
  if (to !== `#${process.env.NO_LOG_CHAN}`) {
    const timestamp: Dayjs = dayjs();
    console.log(`${timestamp.format(DATETIME_FORMAT)} ${to}\t<${nick}> ${text}`);
  }
}
