import React from 'react';
import {Container, PurchaseItemInfo} from './styles';
import {PurchaseType} from '@src/types';
import {translatedPaymentMethod} from '@src/utils';

type PurchaseProps = {
  puchase: PurchaseType;
  onPress: () => void;
};

export const Purchase = ({onPress, puchase}: PurchaseProps): JSX.Element => {
  return (
    <Container onPress={onPress}>
      <PurchaseItemInfo>
        {puchase.createdAt.toLocaleString('pt-br')}
      </PurchaseItemInfo>
      <PurchaseItemInfo>
        {translatedPaymentMethod(puchase.paymentMethod)}
      </PurchaseItemInfo>
      <PurchaseItemInfo>{puchase.products.length} item(s)</PurchaseItemInfo>
    </Container>
  );
};
