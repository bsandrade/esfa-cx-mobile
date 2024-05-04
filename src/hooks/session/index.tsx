import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import auth, {firebase} from '@react-native-firebase/auth';
import {UserType} from '@src/types';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useToastApp} from '../toast-app';
import {useSecrets} from '../secrets';
import {AuthException} from '@src/shared/exceptions/api-exceptions';

type SessionType = {
  isAuthenticated: boolean;
  inProgressSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  userData: UserType | undefined;
};

const SessionContext = createContext({} as SessionType);

type SessionProviderProps = {
  children: ReactNode;
};

const SessionProvider = ({children}: SessionProviderProps): JSX.Element => {
  const [userData, setUserData] = useState<UserType>();
  const [inProgressSignIn, setInProgressSignIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {toastError, toastSuccess, toastWarning} = useToastApp();
  const {google} = useSecrets();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: google.firebaseAuth.clientId,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 300,
    });
    // firebase.initializeApp({
    //   appId: google.firebaseAuth.appId,
    //   projectId: google.firebaseAuth.projectId,
    // });
  });

  useEffect(() => {
    if (isAuthenticated) {
      toastWarning('Sessão expirada');
      signOut();
      setUserData(undefined);
      setIsAuthenticated(false);
    }
    //eslint-disable-next-line
  }, [])

  const signIn = async () => {
    setInProgressSignIn(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();

      // const credential = GoogleAuthProvider.credential(
      //   idToken,
      //   serverAuthCode,
      // );
      // await auth().signInWithCredential(credential);

      // const userInfo = await GoogleSignin.signIn();
      const newUser: UserType = {
        email: user.email,
        name: `${user.givenName} ${user.familyName}`,
        profilePhoto: user.photo,
      };
      setUserData(newUser);
      setIsAuthenticated(true);
      toastSuccess('Login feito com sucesso');
    } catch (error: any) {
      setIsAuthenticated(false);

      if (error instanceof AuthException) {
        toastWarning(
          'Você não tem permissão para acessar o sistema. Entre em contato com o administrador',
        );
        return;
      }

      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        toastError('Login cancelado pelo usuário');
        return;
      }

      if (error?.code === statusCodes.IN_PROGRESS) {
        toastError('Já foi identificada uma tentativa de login em progresso');
        return;
      }

      if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        toastError('O serviço da Google está atualmente indisponível');
        return;
      }
      toastError('Ocorreu um erro ao realizar o login');
    } finally {
      setInProgressSignIn(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (err) {
      toastError('Ocorreu um erro');
    } finally {
      setUserData(null as any);
      setIsAuthenticated(false);
      toastSuccess('Logout feito com sucesso');
    }
  };

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        inProgressSignIn,
        signIn,
        signOut,
        userData,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

function useSession() {
  const context = useContext(SessionContext);
  return context;
}

export {useSession, SessionProvider};
