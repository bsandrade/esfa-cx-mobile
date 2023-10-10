import {
  NavigationType,
  PaymentMethodType,
  ProductType,
  ScreenProps,
} from '@src/types';
import React, {useEffect, useState} from 'react';
import {
  CheckoutSeparator,
  Container,
  FinishButton,
  ProductInfo,
  ProductItem,
  ProductSection,
  PaymentMethod,
  PaymentArea,
  SumArea,
  SumInfo,
  DetailsArea,
  DetailsInfo,
  DetailsSection,
  PaidValueSection,
  PaidValueInfo,
  PaidValueInput,
} from './styles';
import {formatCurrency, sumTotalValue} from '@src/utils';
import {TopBar} from '@components/TopBar';
import {useTheme} from 'styled-components/native';
import {TextInput, ToastAndroid} from 'react-native';

export const CheckoutScreen = ({
  navigation,
  route,
}: ScreenProps): JSX.Element => {
  const [products] = useState<ProductType[]>(route?.params.products || []);
  const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethodType>(
    null,
  );

  const totalValue = sumTotalValue(products);
  const [paidValue, setPaidValue] = useState(totalValue);

  const theme = useTheme();
  const iconSize = theme.icon.size.normal;
  const iconColor = theme.colors.text.primary;

  useEffect(() => {
    if (!route?.params || route.params.products?.length === 0) {
      navigation?.navigate(NavigationType.HOME);
    }
  });

  const handleSetPaymentMethod = (input: PaymentMethodType) => {
    if (paymentMethod === input) {
      setPaymentMethod(null);
    } else {
      setPaymentMethod(input);
    }
    if (input !== PaymentMethodType.MONEY) {
      setPaidValue(totalValue);
    }
  };

  const translatedPaymentMethod = () => {
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
  };

  const handlePurchase = () => {
    if (paymentMethod === null) {
      ToastAndroid.showWithGravity(
        'Método de pagamento não informado',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    } else {
      if (paidValue < totalValue) {
        ToastAndroid.showWithGravity(
          `O Valor do pagamento precisa ser pelo menos ${formatCurrency(
            totalValue,
          )}`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      } else {
        navigation?.navigate(NavigationType.CONNECT);
        // navigation?.goBack();
      }
    }
  };

  const handleSetPaidValue = (input: number) => {
    setPaidValue(Math.abs(input));
  };

  return (
    <Container>
      <TopBar
        name="Checkout"
        leftIconName="chevron-left"
        onClickLeftIcon={() => navigation?.goBack()}
        rightIconName="account-circle"
        onClickRightIcon={() => {}}
      />
      <ProductSection
        data={products}
        renderItem={it => (
          <ProductItem key={it.item.id}>
            <ProductInfo>
              {it.item.name}({it.item.quantity})
            </ProductInfo>
            <ProductInfo>
              {formatCurrency(it.item.quantity * it.item.price)}
            </ProductInfo>
          </ProductItem>
        )}
      />
      <CheckoutSeparator />
      <SumArea>
        <SumInfo>Total: </SumInfo>
        <SumInfo>{formatCurrency(totalValue)}</SumInfo>
      </SumArea>
      <PaymentArea>
        <PaymentMethod
          name={'credit-card'}
          size={iconSize}
          color={iconColor}
          selectedMethod={paymentMethod === PaymentMethodType.CREDIT}
          onPress={() => handleSetPaymentMethod(PaymentMethodType.CREDIT)}
        />
        <PaymentMethod
          name={'money-bill-wave'}
          size={iconSize}
          color={iconColor}
          selectedMethod={paymentMethod === PaymentMethodType.MONEY}
          onPress={() => handleSetPaymentMethod(PaymentMethodType.MONEY)}
        />
        <PaymentMethod
          name={'pix'}
          size={iconSize}
          color={iconColor}
          selectedMethod={paymentMethod === PaymentMethodType.PIX}
          onPress={() => handleSetPaymentMethod(PaymentMethodType.PIX)}
        />
      </PaymentArea>
      {paymentMethod === PaymentMethodType.MONEY && (
        <PaidValueSection>
          <PaidValueInfo>Informe o valor pago:</PaidValueInfo>
          <PaidValueInput
            value={paidValue}
            onChangeValue={e => {
              e !== null && handleSetPaidValue(e);
            }}
            renderTextInput={textInputProps => (
              <TextInput {...textInputProps} />
            )}
            prefix="R$"
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            underlineColorAndroid={'transparent'}
          />
        </PaidValueSection>
      )}
      <DetailsArea>
        <DetailsSection>
          <DetailsInfo>Método de pagamento:</DetailsInfo>
          <DetailsInfo>{translatedPaymentMethod()}</DetailsInfo>
        </DetailsSection>
        <CheckoutSeparator />
        <DetailsSection>
          <DetailsInfo>Valor pago</DetailsInfo>
          <DetailsInfo>{formatCurrency(paidValue)}</DetailsInfo>
        </DetailsSection>
        <DetailsSection>
          <DetailsInfo>Troco</DetailsInfo>
          <DetailsInfo>{formatCurrency(paidValue - totalValue)}</DetailsInfo>
        </DetailsSection>
      </DetailsArea>
      <FinishButton name="FINALIZAR" onPress={() => handlePurchase()} />
    </Container>
  );
};
