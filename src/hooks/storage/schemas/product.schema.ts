import Realm, {ObjectSchema} from 'realm';
import {Schemas} from '../realm/constants';
import {ProductSegmentType} from '@src/types';

export class ProductSchema extends Realm.Object<ProductSchema> {
  id!: string;
  name!: string;
  price!: number;
  oldPrice?: number | undefined;
  type!: ProductSegmentType;

  static schema: ObjectSchema = {
    name: Schemas.PRODUCT,
    properties: {
      id: 'string',
      name: 'string',
      price: 'float',
      oldPrice: 'float?',
      type: 'string',
    },
    primaryKey: 'id',
  };
}
