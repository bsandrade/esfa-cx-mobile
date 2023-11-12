import Realm from 'realm';
import {useQuery, useRealm} from './realm';
import {
  CreateDeviceType,
  CreatePurchaseType,
  DeviceType,
  ProductSegmentType,
  ProductType,
  PurchaseType,
} from '@src/types';
import React, {ReactNode, createContext, useContext} from 'react';

import {Schemas} from './realm/constants';
import {PurchaseSchema} from './schemas/purchase.schema';
import {ProductSchema} from './schemas/product.schema';
import {ConnectedDevicesSchema} from './schemas/connected-devices.schema';

type StorageProviderType = {
  children: ReactNode;
};

type StorageContextType = {
  getPurchases: () => Array<PurchaseType>;
  savePurchase: (input: CreatePurchaseType) => PurchaseType;
  deletePurchase: (id: string) => void;
  setProducts: (input: ProductType[]) => Array<ProductType>;
  getProducts: () => Array<ProductType>;
  clearData: () => void;
  clearPurchases: () => void;
  clearProducts: () => void;
  setDevice: (input: CreateDeviceType) => void;
  getDevices: () => Array<DeviceType>;
};

const StorageContext = createContext({} as StorageContextType);

const StorageProvider = ({children}: StorageProviderType): JSX.Element => {
  const realm = useRealm();
  const purchases = useQuery(PurchaseSchema);
  const products = useQuery(ProductSchema);
  const devices = useQuery(ConnectedDevicesSchema);

  const savePurchase = ({
    paymentMethod,
    products: productItems,
    user,
    paidValue,
  }: CreatePurchaseType) => {
    const newPurchase = {
      paymentMethod,
      products: productItems,
      user,
      paidValue,
      createdAt: new Date(),
      id: new Realm.BSON.UUID(),
    };
    realm.write(() => {
      realm.create(Schemas.PURCHASE, newPurchase);
    });
    return {
      ...newPurchase,
      id: newPurchase.id.toString(),
    };
  };

  const getDevices = () => {
    const response: Array<DeviceType> = [];
    devices.forEach(purchase => {
      response.push({
        id: purchase.id.toString(),
        address: purchase.address,
        lastConnected: purchase.lastConnected,
      });
    });
    return response;
  };

  const getPurchases = () => {
    const response: Array<PurchaseType> = [];
    purchases.forEach(purchase => {
      response.push({
        id: purchase.id.toString(),
        paymentMethod: purchase.paymentMethod,
        products: purchase.products.map(product => ({
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          quantity: product.quantity,
          type: product.type as ProductSegmentType,
        })),
        user: purchase.user,
        paidValue: purchase.paidValue,
        createdAt: purchase.createdAt,
      });
    });
    return response;
  };

  const deletePurchase = (id: string) => {
    const purchaseToDelete = purchases.find(
      purchase => purchase.id.toString() === id,
    );
    realm.write(() => {
      realm.delete(purchaseToDelete);
    });
  };

  const deleteDevices = () => {
    console.debug('[storage-deleting-devices]');
    realm.write(() => {
      devices.map(dev => {
        return realm.delete(dev);
      });
    });
  };

  const setDevice = ({address}: CreateDeviceType) => {
    console.debug('[storage-device-starting]');
    const newDevices = [
      ...devices.map(dev => {
        return {
          address: dev.address,
          lastConnected: false,
        };
      }),
    ];
    const index = newDevices.findIndex(dev => dev.address === address);
    deleteDevices();
    if (index >= 0) {
      console.debug('[storage-set-last-connected]');
      newDevices[index].lastConnected = true;
    } else {
      newDevices.push({
        address,
        lastConnected: true,
      });
    }
    realm.write(() => {
      newDevices.map(dev => {
        const newDevice = {
          ...dev,
          id: new Realm.BSON.UUID(),
        };
        return realm.create(Schemas.DEVICE, newDevice);
      });
    });
  };

  const setProducts = (input: ProductType[]) => {
    deleteAllProducts();
    realm.write(() => {
      input.map(product => {
        return realm.create(Schemas.PRODUCT, {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          type: product.type,
        });
      });
    });
    return input;
  };

  const getProducts = () => {
    const response: Array<ProductType> = [];
    products.forEach(product => {
      response.push({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        type: product.type,
        oldPrice: product.oldPrice,
      });
    });
    return response;
  };

  const deleteAllPurchases = () => {
    realm.write(() => {
      purchases.map(purchase => {
        return realm.delete(purchase);
      });
    });
  };

  const deleteAllProducts = () => {
    realm.write(() => {
      products.map(product => {
        return realm.delete(product);
      });
    });
  };
  const clearData = () => {
    deleteAllPurchases();
    deleteAllProducts();
  };

  const clearPurchases = () => {
    deleteAllPurchases();
  };

  return (
    <StorageContext.Provider
      value={{
        getPurchases,
        getProducts,
        getDevices,
        savePurchase,
        setDevice,
        setProducts,
        deletePurchase,
        clearData,
        clearPurchases,
        clearProducts: deleteAllProducts,
      }}>
      {children}
    </StorageContext.Provider>
  );
};

function useStorage() {
  const context = useContext(StorageContext);
  return context;
}

export {StorageProvider, useStorage};
