import React from 'react';
import {
  Container,
  ProductHeaderArea,
  ProductIconArea,
  ProductIconAwesome6,
  ProductIconCommunity,
  ProductIconEntypo,
  ProductInfoArea,
  ProductInfoName,
  ProductInfoValue,
  ProductQuantityArea,
  ProductQuantityIcon,
  ProductQuantityIconButton,
  ProductQuantityInfo,
} from './styles';
import {useTheme} from 'styled-components';
import {DefaultTheme} from 'styled-components/native';
import {formatCurrency} from '@src/utils';
import {ProductSegmentType} from '@src/types';
import {useToastApp} from '@src/hooks/toast-app';

type ProductProps = {
  name: string;
  quantity: number;
  type: ProductSegmentType;
  price: number;
  setQuantity: (input: number) => void;
};

export const Product = ({
  name,
  price,
  quantity,
  type,
  setQuantity,
}: ProductProps): JSX.Element => {
  const {toastInfo} = useToastApp();

  const handleSetQuantity = (input: number) => {
    if (input >= 0) {
      setQuantity(input);
    } else {
      toastInfo('Quantidade mínima é zero');
    }
  };

  const theme = useTheme() as DefaultTheme;
  const iconSize = theme.icon.size.normal;
  const iconColor = theme.colors.primary.main;

  return (
    <Container>
      <ProductHeaderArea>
        <ProductIconArea>
          {type === 'drink' && (
            <ProductIconEntypo name="drink" size={iconSize} color={iconColor} />
          )}
          {type === 'food' && (
            <ProductIconAwesome6
              size={iconSize}
              color={iconColor}
              name="burger"
            />
          )}
          {type === 'both' && (
            <ProductIconCommunity
              size={iconSize}
              color={iconColor}
              name="food"
            />
          )}
        </ProductIconArea>
        <ProductInfoArea>
          {name.length > 18 ? (
            <ProductInfoName numberOfLines={2} ellipsizeMode="tail">
              {name.toUpperCase()}
            </ProductInfoName>
          ) : (
            <ProductInfoName>{name.toUpperCase()}</ProductInfoName>
          )}
          <ProductInfoValue>{formatCurrency(price)}</ProductInfoValue>
        </ProductInfoArea>
      </ProductHeaderArea>

      <ProductQuantityArea>
        <ProductQuantityIconButton
          activeOpacity={0.7}
          onPress={() => handleSetQuantity(quantity + 1)}>
          <ProductQuantityIcon name="add" />
        </ProductQuantityIconButton>
        <ProductQuantityInfo>{quantity}</ProductQuantityInfo>
        <ProductQuantityIconButton
          onPress={() => handleSetQuantity(quantity - 1)}
          activeOpacity={0.7}>
          <ProductQuantityIcon name="remove" />
        </ProductQuantityIconButton>
      </ProductQuantityArea>
    </Container>
  );
};
