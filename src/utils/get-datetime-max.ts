import {DateTime} from 'luxon';

export function getDateTimeMax(input: Date) {
  const output = DateTime.fromJSDate(input).setZone('America/Sao_Paulo');
  return output.set({
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  });
}
