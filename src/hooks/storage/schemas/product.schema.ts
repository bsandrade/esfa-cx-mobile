import Realm, {ObjectSchema} from 'realm';
import {Schemas} from '../realm/constants';
import {ProductSegmentType} from '@src/types';

export class ProductSchema extends Realm.Object<ProductSchema> {
  id!: Realm.BSON.UUID;
  name!: string;
  price!: number;
  type!: ProductSegmentType;

  static schema: ObjectSchema = {
    name: Schemas.PRODUCT,
    properties: {
      id: 'uuid',
      name: 'string',
      price: 'float',
      type: 'string',
    },
    primaryKey: 'id',
  };
}
