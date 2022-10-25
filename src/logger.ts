import dayjs, { type Dayjs } from 'dayjs';

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function messageLogHandler(nick: string, to: string, text: string, message: string) {
  const timestamp: Dayjs = dayjs();
  console.log(`${timestamp.format(DATETIME_FORMAT)}\t${to}\t<${nick}> ${text}`);
}
