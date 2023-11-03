import React from 'react';
import {
  Container,
  PurchaseArea,
  PurchaseContext,
  PurchaseHeader,
  PurchaseId,
  PurchasePrintButton,
  PurchaseProductArea,
  PurchaseProductDetails,
  PurchaseProductInfo,
  PurchaseProductPriceDetails,
  PurchaseProducts,
} from './styles';
import {PaymentMethodType, PurchaseType} from '@src/types';
import {TouchableIcon} from '@components/Base/TouchableIcon';
import {useTheme} from 'styled-components/native';
import {
  formatCurrency,
  sumTotalValue,
  translatedPaymentMethod,
} from '@src/utils';
import {useBluetooth} from '@src/hooks/bluetooth';
import {useToastApp} from '@src/hooks/toast-app';

type PurchaseModalProps = {
  showModal: boolean;
  closeModal: () => void;
  purchase: PurchaseType;
};

export const PurchaseModal = ({
  closeModal,
  purchase,
  showModal,
}: PurchaseModalProps): JSX.Element => {
  const theme = useTheme();
  const {printPurchase, validatePrinter} = useBluetooth();
  const {toastError, toastInfo} = useToastApp();

  const iconColor = theme.colors.background;
  const buttonTextColor = theme.colors.text.primary;

  const totalValue = sumTotalValue(purchase.products);

  const handlePrint = async () => {
    const isValid = await validatePrinter();
    if (!isValid) {
      toastError(
        'Erro ao validar impressora, verifique a conexão e tente novamente',
      );
      return;
    }

    await printPurchase({
      ...purchase,
      reprint: true,
    });
    toastInfo('Ordem reimpressa com sucesso');
  };

  return (
    <Container animationType="slide" transparent={true} visible={showModal}>
      <PurchaseContext>
        <PurchaseArea>
          <PurchaseHeader>
            <PurchaseId>
              ID:{' '}
              {purchase.id.length > 25
                ? `${purchase.id.substring(0, 24)}...`
                : purchase.id}
            </PurchaseId>
            <TouchableIcon.Default
              name="close"
              color={iconColor}
              onPress={closeModal}
            />
          </PurchaseHeader>
          <PurchaseProducts
            data={purchase.products}
            renderItem={it => (
              <PurchaseProductArea key={it.index}>
                <PurchaseProductInfo>
                  {it.item.name}({it.item.quantity})
                </PurchaseProductInfo>
                <PurchaseProductInfo>
                  {formatCurrency(it.item.quantity * it.item.price)}
                </PurchaseProductInfo>
              </PurchaseProductArea>
            )}
          />
          <PurchaseProductDetails>
            <PurchaseProductInfo>
              Total: {formatCurrency(totalValue)}
            </PurchaseProductInfo>
            <PurchaseProductInfo>
              {translatedPaymentMethod(purchase.paymentMethod)}
            </PurchaseProductInfo>
          </PurchaseProductDetails>
          {purchase.paymentMethod === PaymentMethodType.MONEY && (
            <PurchaseProductPriceDetails>
              <PurchaseProductInfo>
                Pago: {formatCurrency(purchase.paidValue ?? 0)}
              </PurchaseProductInfo>
              <PurchaseProductInfo>
                Troco: {formatCurrency((purchase.paidValue ?? 0) - totalValue)}
              </PurchaseProductInfo>
            </PurchaseProductPriceDetails>
          )}
          <PurchasePrintButton
            name="Reimprimir"
            textColor={buttonTextColor}
            onPress={handlePrint}
          />
        </PurchaseArea>
      </PurchaseContext>
    </Container>
  );
};
