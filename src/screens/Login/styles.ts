import {ScreenView} from '@components/Base/ScreenView';
import {TextApp} from '@components/Base/Text';
import {TouchableIcon} from '@components/Base/TouchableIcon';
import {resPX} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled(ScreenView)``;

export const Content = styled.View`
  margin: ${resPX(20)} 0;
  flex: 1;
  justify-content: space-between;
  margin-top: ${resPX(60)};
`;

export const LogoArea = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: ${resPX(130)};
  height: ${resPX(130)};
`;

export const LogoIcon = styled(TouchableIcon.Awesome)`
  margin-left: ${resPX(15)};
`;

export const LoginButton = styled.TouchableOpacity`
  padding: ${resPX(12)} 0;
  min-height: ${resPX(55)};
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.colors.google.blue};
  border-radius: ${({theme}) => theme.border.radius.normal};
`;

export const LoginText = styled(TextApp)`
  color: ${({theme}) => theme.colors.background};
  margin-left: ${resPX(20)};
`;

export const LoginTextArea = styled.View`
  flex: 1;
  align-items: center;
  margin-right: ${resPX(20)};
`;

export const LoginArea = styled.View``;
export const Footer = styled.View`
  margin-top: ${resPX(15)};
  margin-bottom: ${resPX(30)};
`;

export const FooterInfo = styled(TextApp)`
  text-align: center;
  font-size: ${({theme}) => resPX(theme.font.size.small)};
`;

export const IsSigningArea = styled.View`
  align-items: center;
  flex: 1;
`;

export const IsSigning = styled.ActivityIndicator``;
