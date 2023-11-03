import {PaymentMethodType} from './payment-method.type';
import {ProductItemType} from './product-item.type';

export type CreatePurchaseType = {
  products: ProductItemType[];
  paymentMethod: PaymentMethodType;
  user: string;
  paidValue?: number;
};
export type PurchaseType = CreatePurchaseType & {
  id: string;
  createdAt: Date;
};
