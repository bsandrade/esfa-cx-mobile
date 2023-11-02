import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import {ProductSchema} from '../schemas/product.schema';
import {PurchaseSchema} from '../schemas/purchase.schema';
import {ProductItemSchema} from '../schemas/product-item.schema';

const realmConfig: Realm.Configuration = {
  schema: [ProductSchema, ProductItemSchema, PurchaseSchema],
  schemaVersion: 3,
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

export {RealmProvider, useRealm, useObject, useQuery};
