import React from 'react';
import {Container, ContainerIndicator, IsLoadingArea} from './styles';
import {useTheme} from 'styled-components/native';
import {StatusBar} from 'react-native';

type LoadingModalProps = {
  isLoading: boolean;
};

export const LoadingModal = ({isLoading}: LoadingModalProps): JSX.Element => {
  const theme = useTheme();
  const iconColor = theme.colors.background;
  const iconSize = theme.font.size.max;

  const statusBarColor = theme.colors.backgroundTransparent;

  return (
    <Container animationType="fade" transparent={true} visible={isLoading}>
      {isLoading && <StatusBar backgroundColor={statusBarColor} translucent />}
      <IsLoadingArea>
        <ContainerIndicator size={iconSize} color={iconColor} />
      </IsLoadingArea>
    </Container>
  );
};
