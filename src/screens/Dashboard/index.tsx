import React, {useEffect, useState} from 'react';
import {
  ButtonsArea,
  Container,
  Content,
  DashButton,
  DashIsPrinting,
  DateText,
  FilterArea,
  FilterButton,
  FilterComponentsDateArea,
  FilterInfo,
  HourFilterArea,
  HourInput,
  HourText,
  ReportArea,
} from './styles';
import {TopBar} from '@components/TopBar';
import {ReportItem} from '@components/ReportItem';
import {DropdownApp, DropdownItem} from '@components/Base/Dropdown';
import {
  NavigationType,
  PaymentMethodType,
  PurchaseType,
  ScreenProps,
} from '@src/types';
import {useStorage} from '@src/hooks/storage';
// import {useSession} from '@src/hooks/session';
import {useToastApp} from '@src/hooks/toast-app';
import {DatePicker} from '@components/Base/DatePicker';
import {DateTime} from 'luxon';
import {getDateTimeMax, getDateTimeZero, textInputToNumber} from '@src/utils';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTheme} from 'styled-components/native';
import {useBluetooth} from '@src/hooks/bluetooth';

export const DashboardScreen = ({
  navigation,
  route,
}: ScreenProps): JSX.Element => {
  const labels: Array<DropdownItem> = [
    {
      label: 'Datas',
      value: 'date-interval',
    },
    {
      label: 'Horas',
      value: 'hours-count',
    },
    {
      label: 'Compras',
      value: 'purchases-count',
    },
  ];

  const [selectedLabel, setSelectedLabel] = useState(labels[0].value);
  const [purchases, setPurchases] = useState<Array<PurchaseType>>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<
    Array<PurchaseType>
  >([]);

  const [startDate, setStartDate] = useState(getDateTimeZero(new Date()));
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

  const [endDate, setEndDate] = useState(getDateTimeMax(new Date()));
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const [lastHoursCount, setLastHoursCount] = useState(24);

  const [lastPurchasesCount, setLastPurchaseCount] = useState(10);

  const {getPurchases, clearPurchases} = useStorage();
  // const {userData} = useSession();
  const {toastSuccess, toastWarning, toastInfo} = useToastApp();
  const {printReport, isPrinting} = useBluetooth();
  const theme = useTheme();

  const handleSetStartDate = (input: DateTime) => {
    if (input.diff(endDate).milliseconds > 0) {
      toastWarning(
        'Data de início precisa ser menor ou igual que a data final',
      );
      return;
    }
    setStartDate(input);
  };

  const handleSetEndDate = (input: DateTime) => {
    if (input.diff(startDate).milliseconds < 0) {
      toastWarning('Data final precisa ser maior ou igual que a data inicial');
      return;
    }
    setEndDate(getDateTimeMax(input.toJSDate()));
  };

  const handlePixPurchases = () =>
    filteredPurchases.filter(
      purchase => purchase.paymentMethod === PaymentMethodType.PIX,
    );
  const handleCardPurchases = () =>
    filteredPurchases.filter(
      purchase => purchase.paymentMethod === PaymentMethodType.CREDIT,
    );
  const handleMoneyPurchases = () =>
    filteredPurchases.filter(
      purchase => purchase.paymentMethod === PaymentMethodType.MONEY,
    );

  const handleGetTotalProducts = (input: Array<PurchaseType>) =>
    input.reduce((prev, curr) => {
      return prev + curr.products.length;
    }, 0);

  const handleGetTotalValue = (input: Array<PurchaseType>) =>
    input.reduce((prev, curr) => {
      const totalProductsValue = curr.products.reduce((prev, curr) => {
        return prev + curr.quantity * curr.price;
      }, 0);
      return prev + totalProductsValue;
    }, 0);

  const handleUpdateFilteredPurchases = () => {
    switch (selectedLabel) {
      case 'date-interval':
        setFilteredPurchases(
          purchases.filter(purchase => {
            const dCheck = DateTime.fromJSDate(purchase.createdAt);
            const finalEndDate = endDate.set({
              hour: 23,
              minute: 59,
              second: 99,
              millisecond: 999,
            });
            return (
              dCheck.diff(startDate).milliseconds >= 0 &&
              finalEndDate.diff(dCheck).milliseconds >= 0
            );
          }),
        );
        break;
      case 'hours-count':
        const now = DateTime.now();
        setFilteredPurchases(
          purchases.filter(purchase => {
            const dCheck = DateTime.fromJSDate(purchase.createdAt);
            return now.diff(dCheck).milliseconds / 3.6e6 <= lastHoursCount;
          }),
        );
        break;
      case 'purchases-count':
        let count = 1;
        setFilteredPurchases(
          purchases
            .sort((pa, pb) => pb.createdAt.getTime() - pa.createdAt.getTime())
            .filter(() => count++ <= lastPurchasesCount),
        );
        break;
    }
  };

  useEffect(() => {
    const newPurchases = getPurchases();
    setPurchases(newPurchases);
    setFilteredPurchases(newPurchases);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log('handle update');
    handleUpdateFilteredPurchases();
    // eslint-disable-next-line
  }, [purchases, selectedLabel, startDate, endDate, lastHoursCount, lastPurchasesCount]);

  const handleClearPurchases = () => {
    Alert.alert(
      'Tem certeza?',
      'Ao confirmar, todos os dados de compra serão excluídos',
      [
        {
          text: 'Cancelar',
          onPress: () => toastInfo('Os dados não foram apagados'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            clearPurchases();
            toastSuccess('Os dados foram limpos');
          },
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      style={{flex: 1, backgroundColor: theme.colors.background}}
      behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <TopBar
            name="Relatório"
            leftIconName="chevron-left"
            onClickLeftIcon={() => navigation?.goBack()}
            rightIconName="bluetooth"
            onClickRightIcon={() =>
              navigation?.navigate(NavigationType.CONNECT, {
                ...route?.params,
                goBack: NavigationType.DASHBOARD,
              })
            }
          />
          <Content>
            <ReportArea>
              <ReportItem
                iconName="pix"
                title={`PIX: ${handlePixPurchases().length} Operações`}
                productsNumber={handleGetTotalProducts(handlePixPurchases())}
                total={handleGetTotalValue(handlePixPurchases())}
              />
              <ReportItem
                iconName="credit-card"
                title={`CARTÃO: ${handleCardPurchases().length} Operações`}
                productsNumber={handleGetTotalProducts(handleCardPurchases())}
                total={handleGetTotalValue(handleCardPurchases())}
              />
              <ReportItem
                iconName="money-bill-wave"
                title={`DINHEIRO: ${handleMoneyPurchases().length} Operações`}
                productsNumber={handleGetTotalProducts(handleMoneyPurchases())}
                total={handleGetTotalValue(handleMoneyPurchases())}
              />
              <DropdownApp
                items={labels}
                selectedItem={selectedLabel}
                setSelectedItem={setSelectedLabel}
              />
              {selectedLabel === 'date-interval' && (
                <FilterArea>
                  <FilterInfo>Selecione o intervalo de datas</FilterInfo>
                  <FilterComponentsDateArea>
                    <FilterButton
                      name="Data de Inicio"
                      onPress={() => setOpenStartDatePicker(true)}
                    />
                    <DateText>
                      {startDate.toJSDate().toLocaleDateString('pt-br')}
                    </DateText>
                  </FilterComponentsDateArea>
                  <FilterComponentsDateArea>
                    <FilterButton
                      name="Data Final"
                      onPress={() => setOpenEndDatePicker(true)}
                    />
                    <DateText>
                      {endDate.toJSDate().toLocaleDateString('pt-br')}
                    </DateText>
                  </FilterComponentsDateArea>
                  <DatePicker
                    open={openStartDatePicker}
                    setOpen={setOpenStartDatePicker}
                    setValue={handleSetStartDate}
                    value={startDate}
                  />
                  <DatePicker
                    open={openEndDatePicker}
                    setOpen={setOpenEndDatePicker}
                    setValue={handleSetEndDate}
                    value={endDate}
                  />
                </FilterArea>
              )}
              {selectedLabel === 'hours-count' && (
                <FilterArea>
                  <FilterInfo>
                    Selecione o valor das últimas horas para o filtro
                  </FilterInfo>
                  <HourFilterArea>
                    <HourText>Últimas</HourText>
                    <HourInput
                      keyboardType="numeric"
                      value={String(lastHoursCount)}
                      onChangeText={v => {
                        setLastHoursCount(textInputToNumber(v));
                      }}
                    />
                    <HourText>hora(s)</HourText>
                  </HourFilterArea>
                </FilterArea>
              )}
              {selectedLabel === 'purchases-count' && (
                <FilterArea>
                  <FilterInfo>
                    Selecione o número de últimas compras para o filtro
                  </FilterInfo>
                  <HourFilterArea>
                    <HourText>Últimas</HourText>
                    <HourInput
                      keyboardType="numeric"
                      value={String(lastPurchasesCount)}
                      onChangeText={v => {
                        setLastPurchaseCount(textInputToNumber(v));
                      }}
                    />
                    <HourText>compra(s)</HourText>
                  </HourFilterArea>
                </FilterArea>
              )}
            </ReportArea>
            <ButtonsArea>
              <DashButton
                name={isPrinting ? 'Imprimindo' : 'Imprimir'}
                Animation={isPrinting ? <DashIsPrinting /> : undefined}
                onPress={() => {
                  if (isPrinting) {
                    toastWarning(
                      'No momento uma tentativa de impressão está acontecendo',
                    );
                  } else {
                    printReport(filteredPurchases);
                  }
                }}
              />
              <DashButton name="Limpar Dados" onPress={handleClearPurchases} />
            </ButtonsArea>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
