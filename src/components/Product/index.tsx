import React from 'react';
import {
  Container,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductQuantity,
} from './styles';
import {TouchableIcon} from '@components/Base/TouchableIcon';
import {useTheme} from 'styled-components';
import {DefaultTheme} from 'styled-components/native';
import {formatCurrency, textInputToNumber} from '@src/utils';

type ProductProps = {
  name: string;
  quantity: number;
  price: number;
  setQuantity: (input: number) => void;
};

export const Product = ({
  name,
  price,
  quantity,
  setQuantity,
}: ProductProps): JSX.Element => {
  const handleUpdateQuantity = (input: string) => {
    setQuantity(textInputToNumber(input));
  };

  const handleSetQuantity = (input: number) => {
    if (input >= 0) {
      setQuantity(input);
    }
  };

  const theme = useTheme() as DefaultTheme;
  const iconSize = theme.font.size.bigger;
  const iconColor = theme.colors.background;
  return (
    <Container activeOpacity={0.7}>
      <ProductName>{name.toUpperCase()}</ProductName>
      <ProductInfo>
        <ProductPrice>{formatCurrency(price)}</ProductPrice>
        <TouchableIcon.Default
          color={iconColor}
          size={iconSize}
          name={'add'}
          onPress={() => handleSetQuantity(quantity + 1)}
        />
        <ProductQuantity
          value={`${quantity}`}
          keyboardType="numeric"
          onChangeText={e => handleUpdateQuantity(e)}
        />
        <TouchableIcon.Default
          color={iconColor}
          size={iconSize}
          name={'remove'}
          onPress={() => handleSetQuantity(quantity - 1)}
        />
      </ProductInfo>
    </Container>
  );
};
