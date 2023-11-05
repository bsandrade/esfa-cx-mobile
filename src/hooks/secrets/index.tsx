import React, {ReactNode, createContext, useContext, useState} from 'react';
import {
  GOOGLE_FIREBASE_AUTH_CLIENTID,
  GOOGLE_FIREBASE_AUTH_APP_ID,
  GOOGLE_FIREBASE_AUTH_PROJECT_ID,
} from '@env';

export type SecretsType = {
  google: {
    firebaseAuth: {
      clientId: string;
      appId: string;
      projectId: string;
    };
  };
};

const SecretsContext = createContext({} as SecretsType);

type SecretsProviderProps = {
  children: ReactNode;
};

const SecretsProvider = ({children}: SecretsProviderProps): JSX.Element => {
  const [secrets] = useState(() => {
    const obj: SecretsType = {
      google: {
        firebaseAuth: {
          clientId: GOOGLE_FIREBASE_AUTH_CLIENTID,
          appId: GOOGLE_FIREBASE_AUTH_APP_ID,
          projectId: GOOGLE_FIREBASE_AUTH_PROJECT_ID,
        },
      },
    };
    return obj;
  });

  return (
    <SecretsContext.Provider value={secrets}>
      {children}
    </SecretsContext.Provider>
  );
};

function useSecrets() {
  const context = useContext(SecretsContext);
  return context;
}

export {useSecrets, SecretsProvider};
