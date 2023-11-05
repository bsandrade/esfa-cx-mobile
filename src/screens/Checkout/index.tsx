import {
  NavigationType,
  PaymentMethodType,
  ProductItemType,
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
  FinishingIndicator,
} from './styles';
import {
  formatCurrency,
  sumTotalValue,
  translatedPaymentMethod,
} from '@src/utils';
import {TopBar} from '@components/TopBar';
import {useTheme} from 'styled-components/native';
import {TextInput} from 'react-native';
import {useToastApp} from '@hooks/toast-app';
import {useBluetooth} from '@hooks/bluetooth';
import {useStorage} from '@hooks/storage';

export const CheckoutScreen = ({
  navigation,
  route,
}: ScreenProps): JSX.Element => {
  const [products] = useState<ProductItemType[]>(route?.params.products || []);
  const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethodType>(
    null,
  );

  const totalValue = sumTotalValue(products);
  const [paidValue, setPaidValue] = useState(totalValue);
  const [printerIsValid, setPrinterIsValid] = useState<boolean>(true);
  const [inProgressFinish, setInProgressFinish] = useState<boolean>(false);

  const {toastWarning, toastError, toastInfo} = useToastApp();
  const {printPurchase, validatePrinter} = useBluetooth();
  const {savePurchase} = useStorage();

  const theme = useTheme();
  const iconSize = theme.icon.size.normal;
  const iconColor = theme.colors.text.primary;

  useEffect(() => {
    if (!route?.params || route.params.products?.length === 0) {
      navigation?.navigate(NavigationType.HOME);
    }
    if (route?.params.goBack === NavigationType.CONNECT) {
      validatePrinter()
        .then(() => setPrinterIsValid(true))
        .catch(() => setPrinterIsValid(false));
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

  const handlePurchase = async () => {
    if (paymentMethod === null) {
      toastWarning('Método de pagamento não informado');
      return;
    }

    if (paidValue < totalValue) {
      toastWarning(
        `O Valor do pagamento precisa ser pelo menos ${formatCurrency(
          totalValue,
        )}`,
      );
      return;
    }
    setInProgressFinish(true);
    try {
      const isValid = await validatePrinter();
      if (!isValid) {
        toastError('Erro ao validar impressora...');
        setPrinterIsValid(isValid);
        return;
      }

      const newPurchase = savePurchase({
        paymentMethod,
        products,
        user: 'bruno',
        paidValue,
      });

      await printPurchase(newPurchase);
      toastInfo('Nota gerada com sucesso!');
      navigation?.navigate(NavigationType.HOME, {
        goBack: NavigationType.CHECKOUT,
      });
    } catch (err) {
      console.error(err);
      toastError('Erro no processamento, tente novamente');
    } finally {
      setInProgressFinish(false);
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
        rightIconName="bluetooth"
        onClickRightIcon={() =>
          navigation?.navigate(NavigationType.CONNECT, {
            ...route?.params,
            goBack: NavigationType.CHECKOUT,
          })
        }
      />
      <ProductSection
        data={products}
        renderItem={it => (
          <ProductItem key={it.index}>
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
          <DetailsInfo>{translatedPaymentMethod(paymentMethod)}</DetailsInfo>
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
      {printerIsValid ? (
        <FinishButton
          name={inProgressFinish ? 'FINALIZANDO' : 'FINALIZAR'}
          onPress={() => handlePurchase()}
          Animation={
            inProgressFinish ? (
              <FinishingIndicator color={theme.colors.background} size={20} />
            ) : undefined
          }
        />
      ) : (
        <FinishButton
          name="CONECTAR"
          onPress={() => {
            navigation?.navigate(NavigationType.CONNECT, {
              ...route?.params,
              goBack: NavigationType.CHECKOUT,
            });
          }}
        />
      )}
    </Container>
  );
};
