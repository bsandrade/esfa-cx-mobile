import {ProductSegmentType} from './product.type';

export type ProductItemType = {
  name: string;
  price: number;
  quantity: number;
  type: ProductSegmentType;
};
