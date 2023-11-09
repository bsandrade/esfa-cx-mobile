import {DateTime} from 'luxon';

export function getDateTimeZero(input: Date) {
  const output = DateTime.fromJSDate(input).setZone('America/Sao_Paulo');
  return output.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
}
