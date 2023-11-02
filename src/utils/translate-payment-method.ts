import {PaymentMethodType} from '@src/types';

export function translatedPaymentMethod(
  paymentMethod: PaymentMethodType | null,
) {
  switch (paymentMethod) {
    case PaymentMethodType.PIX:
      return 'PIX';
    case PaymentMethodType.CREDIT:
      return 'CARTÃO';
    case PaymentMethodType.MONEY:
      return 'DINHEIRO';
    default:
      return 'N/A';
  }
}
