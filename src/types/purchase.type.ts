import {PaymentMethodType} from './payment-method.type';
import {ProductType} from './product.type';

export type PurchaseType = {
  products: ProductType[];
  paymentMethod: PaymentMethodType;
};
