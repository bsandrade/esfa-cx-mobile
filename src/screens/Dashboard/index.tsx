import React from 'react';
import {Container, ReportArea} from './styles';
import {TopBar} from '@components/TopBar';
import {ReportItem} from '@components/ReportItem';

export const DashboardScreen = (): JSX.Element => {
  return (
    <Container>
      <TopBar name="Relatório" />
      <ReportArea>
        <ReportItem
          iconName="pix"
          title="PIX: 4 Operações"
          productsNumber={4}
          total={50}
        />
        <ReportItem
          iconName="credit-card"
          title="CARTÃO: 20 Operações"
          productsNumber={30}
          total={380}
        />
        <ReportItem
          iconName="money-bill-wave"
          title="DINHEIRO: 6 Operações"
          productsNumber={90}
          total={500}
        />
      </ReportArea>
    </Container>
  );
};
