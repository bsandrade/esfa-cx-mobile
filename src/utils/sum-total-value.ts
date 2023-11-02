import {ProductItemType} from '@src/types';

export const sumTotalValue = (products: ProductItemType[]) => {
  return products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
};
