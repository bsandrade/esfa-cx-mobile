import React from 'react';
import {useTheme} from 'styled-components/native';
import {
  Container,
  ReportTypeIcon,
  ReportTypeInfo,
  ReportTypeInfoArea,
  ReportTypeSubInfoArea,
  ReportTypeTitle,
} from './styles';
import {formatCurrency} from '@src/utils';

type ReportItemProps = {
  iconName: string;
  title: string;
  total: number;
  productsNumber: number;
};

export const ReportItem = ({
  iconName,
  productsNumber,
  title,
  total,
}: ReportItemProps): JSX.Element => {
  const theme = useTheme();
  const iconColor = theme.colors.primary.main;
  const iconSize = theme.icon.size.giant;
  return (
    <Container>
      <ReportTypeIcon name={iconName} color={iconColor} size={iconSize} />
      <ReportTypeInfoArea>
        <ReportTypeTitle>{title}</ReportTypeTitle>
        <ReportTypeSubInfoArea>
          <ReportTypeInfo>{formatCurrency(total)}</ReportTypeInfo>
          <ReportTypeInfo>{productsNumber} Produtos</ReportTypeInfo>
        </ReportTypeSubInfoArea>
      </ReportTypeInfoArea>
    </Container>
  );
};
