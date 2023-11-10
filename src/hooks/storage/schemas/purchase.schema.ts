import Realm, {ObjectSchema} from 'realm';
import {Schemas} from '../realm/constants';
import {PaymentMethodType} from '@src/types';
import {ProductItemSchema} from './product-item.schema';

export class PurchaseSchema extends Realm.Object<PurchaseSchema> {
  id!: Realm.BSON.UUID;
  products!: ProductItemSchema[];
  paymentMethod!: PaymentMethodType;
  user!: string;
  createdAt!: Date;
  paidValue?: number;

  static schema: ObjectSchema = {
    name: Schemas.PURCHASE,
    properties: {
      id: 'uuid',
      products: {type: 'list', objectType: Schemas.PRODUCT_ITEM},
      paymentMethod: 'string',
      user: 'string',
      paidValue: 'float?',
      createdAt: 'date',
    },
    primaryKey: 'id',
  };
}
