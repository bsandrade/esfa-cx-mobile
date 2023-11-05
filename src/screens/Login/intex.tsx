import React from 'react';
import {
  Container,
  Content,
  Footer,
  FooterInfo,
  IsSigning,
  IsSigningArea,
  LoginArea,
  LoginButton,
  LoginText,
  LoginTextArea,
  Logo,
  LogoArea,
  LogoIcon,
} from './styles';
import {useTheme} from 'styled-components/native';
import {useSession} from '@src/hooks/session';

export const LoginScreen = (): JSX.Element => {
  const theme = useTheme();
  const {signIn, inProgressSignIn} = useSession();
  const iconSize = theme.icon.size.tiny;
  const iconColor = theme.colors.background;

  return (
    <Container>
      <Content>
        <LogoArea>
          <Logo
            resizeMethod="resize"
            source={require('../../assets/logo_externato.png')}
          />
        </LogoArea>
        <LoginArea>
          <LoginButton activeOpacity={0.7} onPress={signIn}>
            {inProgressSignIn ? (
              <IsSigningArea>
                <IsSigning color={iconColor} />
              </IsSigningArea>
            ) : (
              <>
                <LogoIcon color={iconColor} size={iconSize} name="google" />
                <LoginTextArea>
                  <LoginText>Entrar com o Google</LoginText>
                </LoginTextArea>
              </>
            )}
          </LoginButton>
          <Footer>
            <FooterInfo>
              Caso não tenha acesso, por favor solicite ao administrador
            </FooterInfo>
          </Footer>
        </LoginArea>
      </Content>
    </Container>
  );
};
