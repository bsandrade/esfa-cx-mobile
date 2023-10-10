import {ProductType} from '@src/types';

export const sumTotalValue = (products: ProductType[]) => {
  return products.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
};
