import {ButtonApp} from '@components/Base/Buttom';
import {CurrencyInput} from '@components/Base/CurrencyInput';
import {ScreenView} from '@components/Base/ScreenView';
import {TextApp} from '@components/Base/Text';
import {
  TouchableIcon,
  TouchableIconProps,
} from '@components/Base/TouchableIcon';
import {resPX, resPct} from '@src/utils';
import styled, {css} from 'styled-components/native';

export const Container = styled(ScreenView)`
  flex: 1;
`;

export const FinishButton = styled(ButtonApp)`
  margin-bottom: ${resPX(6)};
`;

export const ProductInfo = styled(TextApp)``;

export const ProductSection = styled.FlatList``;

export const ProductItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SumArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${resPX(12)};
`;

export const SumInfo = styled(TextApp)`
  font-size: ${({theme}) => resPX(theme.font.size.bigger)};
  font-family: ${({theme}) => theme.font.weight.bold};
`;

export const CheckoutSeparator = styled.View`
  margin: ${resPX(12)} 0px;
  border: ${resPX(1)} solid ${({theme}) => theme.colors.text.low};
  border-radius: ${resPX(2)};
`;

export const PaymentArea = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: ${resPX(18)} 0px;
`;

type PaymentMethodProps = TouchableIconProps & {
  selectedMethod: boolean;
};

export const PaymentMethod = styled(TouchableIcon.Awesome)<PaymentMethodProps>`
  ${({selectedMethod}) =>
    selectedMethod
      ? css`
          background-color: ${({theme}) => theme.colors.secundary.main};
          color: ${({theme}) => theme.colors.secundary.contrastText};
        `
      : ''}
  border-radius: ${({theme}) => theme.border.radius.normal};
  padding: ${resPct(2)} ${resPct(6)};
  border: ${resPX(1)} solid ${({theme}) => theme.colors.text.primary};
`;

export const DetailsArea = styled.View`
  margin-top: ${resPX(20)};
  margin-bottom: ${resPX(28)};
`;

export const DetailsSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PaidValueSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PaidValueInfo = styled(TextApp)`
  padding: 0;
`;

export const PaidValueInput = styled(CurrencyInput)`
  padding: 0;
  padding-left: ${resPX(8)};
  padding-right: ${resPX(8)};
  border: ${resPX(1)} solid ${({theme}) => theme.colors.text.primary};
  border-radius: ${({theme}) => theme.border.radius.mini};
  width: ${resPX(100)};
`;

export const FinishingIndicator = styled.ActivityIndicator`
  margin-left: ${resPX(8)};
`;

export const DetailsInfo = styled(TextApp)``;
