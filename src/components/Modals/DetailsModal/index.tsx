import React from 'react';
import {
  DetailsArea,
  DetailsContext,
  DetailsHeader,
  DetailsList,
  DetailsText,
  Container,
  FinishArea,
  FinishButton,
  FinishInfo,
  FinishText,
  ProductArea,
  ProductInfo,
} from './styles';
import {TouchableIcon} from '@components/Base/TouchableIcon';
import {useTheme} from 'styled-components/native';
import {formatCurrency, sumTotalValue} from '@src/utils';
import {NavigationType, ProductItemType} from '@src/types';
import {NavigationProp} from '@react-navigation/native';

type DetailsModalProps = {
  showModal: boolean;
  closeModal: () => void;
  products: ProductItemType[];
  navigation?: NavigationProp<any>;
};

export const DetailsModal = ({
  closeModal,
  showModal,
  products,
  navigation,
}: DetailsModalProps): JSX.Element => {
  const theme = useTheme();
  const iconColor = theme.colors.background;
  const totalValue = sumTotalValue(products);

  return (
    <Container animationType="slide" transparent={true} visible={showModal}>
      <DetailsContext>
        <DetailsArea>
          <DetailsHeader>
            <DetailsText>Detalhes</DetailsText>
            <TouchableIcon.Default
              color={iconColor}
              onPress={closeModal}
              name="close"
            />
          </DetailsHeader>
          <DetailsList
            data={products}
            renderItem={it => (
              <ProductArea key={it.index}>
                <ProductInfo>
                  {it.item.name}({it.item.quantity})
                </ProductInfo>
                <ProductInfo>
                  {formatCurrency(it.item.price * it.item.quantity)}
                </ProductInfo>
              </ProductArea>
            )}
          />
          <FinishArea>
            <FinishInfo>
              <FinishText>Total</FinishText>
              <FinishText>{formatCurrency(totalValue)}</FinishText>
            </FinishInfo>
            <FinishButton
              name="Finalizar"
              onPress={() => {
                closeModal();
                navigation?.navigate(NavigationType.CHECKOUT, {
                  products,
                  total: totalValue,
                });
              }}
            />
          </FinishArea>
        </DetailsArea>
      </DetailsContext>
    </Container>
  );
};
