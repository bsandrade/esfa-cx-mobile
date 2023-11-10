import Realm from 'realm';
import {useQuery, useRealm} from './realm';
import {
  CreateProductType,
  CreatePurchaseType,
  ProductSegmentType,
  ProductType,
  PurchaseType,
} from '@src/types';
import React, {ReactNode, createContext, useContext} from 'react';

import {Schemas} from './realm/constants';
import {PurchaseSchema} from './schemas/purchase.schema';
import {ProductSchema} from './schemas/product.schema';

type StorageProviderType = {
  children: ReactNode;
};

type StorageContextType = {
  getPurchases: () => Array<PurchaseType>;
  savePurchase: (input: CreatePurchaseType) => PurchaseType;
  deletePurchase: (id: string) => void;
  setProducts: (input: CreateProductType[]) => Array<ProductType>;
  getProducts: () => Array<ProductType>;
  clearData: () => void;
  clearPurchases: () => void;
};

const StorageContext = createContext({} as StorageContextType);

const StorageProvider = ({children}: StorageProviderType): JSX.Element => {
  const realm = useRealm();
  const purchases = useQuery(PurchaseSchema);
  const products = useQuery(ProductSchema);

  const savePurchase = ({
    paymentMethod,
    products: productItems,
    user,
    paidValue,
  }: CreatePurchaseType) => {
    console.log('TYPES', productItems);
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

  const getPurchases = () => {
    const response: Array<PurchaseType> = [];
    purchases.forEach(purchase => {
      response.push({
        id: purchase.id.toString(),
        paymentMethod: purchase.paymentMethod,
        products: purchase.products.map(product => ({
          name: product.name,
          price: product.price,
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

  const setProducts = (input: CreateProductType[]) => {
    deleteAllProducts();
    const newProducts: Array<ProductType> = [];

    realm.write(() => {
      input.map(product => {
        const newProduct = {
          name: product.name,
          price: product.price,
          type: product.type,
          id: new Realm.BSON.UUID(),
        };
        newProducts.push({
          ...newProduct,
          id: newProduct.id.toString(),
        });
        return realm.create(Schemas.PRODUCT, newProduct);
      });
    });
    return newProducts;
  };

  const getProducts = () => {
    const response: Array<ProductType> = [];
    products.forEach(product => {
      response.push({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        type: product.type,
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
        savePurchase,
        getPurchases,
        deletePurchase,
        setProducts,
        getProducts,
        clearData,
        clearPurchases,
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
