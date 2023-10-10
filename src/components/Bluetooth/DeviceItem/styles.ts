import {TextApp} from '@components/Base/Text';
import {resPX} from '@src/utils';
import styled, {css} from 'styled-components/native';

type ConnectedProps = {
  isConnected: boolean;
  connecting?: boolean;
};

const checkConnectedText = (connected: Boolean) => {
  if (!connected) {
    return css`
      color: ${({theme}) => theme.colors.text.primary};
    `;
  }
};

export const Container = styled.TouchableOpacity<ConnectedProps>`
  background-color: ${({theme}) => theme.colors.primary.main};

  ${({isConnected}) =>
    !isConnected &&
    css`
      background-color: ${({theme}) => theme.colors.text.low};
    `};

  ${({connecting}) =>
    connecting &&
    css`
      background-color: ${({theme}) => theme.colors.text.warning};
    `};
  padding: ${resPX(8)};
  border-radius: ${({theme}) => theme.border.radius.normal};
`;

export const Content = styled.View``;

export const DeviceHead = styled.View``;

export const DeviceSubInfoSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DeviceSubInfo = styled(TextApp)<ConnectedProps>`
  color: ${({theme}) => theme.colors.background};
  ${({isConnected}) => checkConnectedText(isConnected)};

  font-size: ${({theme}) => resPX(theme.font.size.mini)};
`;

export const DeviceName = styled(TextApp)<ConnectedProps>`
  color: ${({theme}) => theme.colors.background};
  ${({isConnected}) => checkConnectedText(isConnected)};
`;

export const DeviceDetails = styled.View`
  margin-top: ${resPX(8)};
  flex-direction: row;
  justify-content: space-between;
`;

export const ConnectionDetails = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ConnectingIndicator = styled.ActivityIndicator``;

export const DetailsInfo = styled(TextApp)<ConnectedProps>`
  color: ${({theme}) => theme.colors.background};
  ${({isConnected}) => checkConnectedText(isConnected)};
  font-size: ${({theme}) => resPX(theme.font.size.micro)};
`;
