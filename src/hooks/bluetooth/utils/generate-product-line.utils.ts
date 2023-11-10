import {ProductItemType} from '@src/types';
import {formatCurrency} from '@src/utils';
import {MAX_CHARS_PER_LINE} from './constants.utils';

export function generateProductLine(input: ProductItemType): string {
  const price = formatCurrency(input.quantity * input.price);
  const remainingLines = MAX_CHARS_PER_LINE - price.length - 6;
  let productName = input.name;
  let needChange = false;
  if (productName.length > remainingLines) {
    productName = productName.substring(0, remainingLines - 1 - 3);
    productName = `${productName}...`;
    needChange = true;
  }

  const currentProductNameIndex = remainingLines - 1 - 3;
  const restOfProductName: Array<string> = [];

  if (needChange) {
    for (
      let i = currentProductNameIndex;
      i < input.name.length;
      i += remainingLines
    ) {
      restOfProductName.push(`${input.name.substring(i, i + remainingLines)}`);
    }
  }

  let quantity = String(input.quantity);
  if (input.quantity > 9999) {
    quantity = '9999';
  }
  let spacesQuantity = [];
  if (4 - quantity.length > 0) {
    spacesQuantity = new Array(4 - quantity.length).fill(' ');
  }
  let spacesPrice = [];

  if (remainingLines - productName.length > 0) {
    spacesPrice = new Array(remainingLines - productName.length).fill(' ');
  }

  const returnString = `${spacesQuantity.join('')}${
    input.quantity
  } ${productName} ${spacesPrice.join('')}${price}${
    restOfProductName.length > 0
      ? `\n     ${restOfProductName.join('\n     ')}`
      : ''
  }`;
  return returnString;
}
