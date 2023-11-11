import Realm, {ObjectSchema} from 'realm';
import {Schemas} from '../realm/constants';

export class ConnectedDevicesSchema extends Realm.Object<ConnectedDevicesSchema> {
  id!: Realm.BSON.UUID;
  address!: string;
  lastConnected!: boolean;
  static schema: ObjectSchema = {
    name: Schemas.DEVICE,
    properties: {
      id: 'uuid',
      address: 'string',
      lastConnected: 'bool',
    },
    primaryKey: 'id',
  };
}
