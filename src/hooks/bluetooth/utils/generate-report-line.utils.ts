import {PurchaseType} from '@src/types';
import {formatCurrency, sumTotalValue} from '@src/utils';
import {MAX_CHARS_PER_LINE} from './constants.utils';

export function generateReportLine(
  input: Array<PurchaseType>,
  type: string,
): string {
  const totalValue = input.reduce((prev, curr) => {
    return prev + sumTotalValue(curr.products);
  }, 0);
  const price = formatCurrency(totalValue);

  const TYPE_NUMBER = 9;
  let typeFormmated = type;
  if (type.length < TYPE_NUMBER) {
    const spaces = new Array(TYPE_NUMBER - type.length).fill(' ');
    typeFormmated += `${spaces.join('')}`;
  }

  const remainingLines =
    MAX_CHARS_PER_LINE - price.length - typeFormmated.length - 2;

  let countPurchases = String(input.length);
  if (countPurchases.length < remainingLines) {
    const spaces = new Array(remainingLines - countPurchases.length).fill(' ');
    countPurchases += `${spaces.join('')}`;
  }

  const returnString = `${typeFormmated} ${countPurchases} ${price}`;
  return returnString;
}
