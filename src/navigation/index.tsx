import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CheckoutScreen} from '@screens/Checkout';
import {ConnectScreen} from '@screens/Connect';
import {HomeScreen} from '@screens/Home';
import {NavigationType} from '@src/types';
import {ProfileScreen} from '@screens/Profile';
import {LoginScreen} from '@screens/Login/intex';
import {useSession} from '@src/hooks/session';

const Stack = createNativeStackNavigator();
export const NavigationScreens = (): JSX.Element => {
  const {isAuthenticated} = useSession();
  return (
    <>
      {isAuthenticated ? (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={NavigationType.PROFILE}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name={NavigationType.HOME} component={HomeScreen} />
            <Stack.Screen
              name={NavigationType.CHECKOUT}
              component={CheckoutScreen}
            />
            <Stack.Screen
              name={NavigationType.CONNECT}
              component={ConnectScreen}
            />
            <Stack.Screen
              name={NavigationType.PROFILE}
              component={ProfileScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};
