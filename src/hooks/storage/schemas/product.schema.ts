import Realm, {ObjectSchema} from 'realm';
import {Schemas} from '../realm/constants';

export class ProductSchema extends Realm.Object<ProductSchema> {
  id!: Realm.BSON.UUID;
  name!: string;
  price!: number;

  static schema: ObjectSchema = {
    name: Schemas.PRODUCT,
    properties: {
      id: 'uuid',
      name: 'string',
      price: 'float',
    },
    primaryKey: 'id',
  };
}
