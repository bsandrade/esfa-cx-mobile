import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CheckoutScreen} from '@screens/Checkout';
import {ConnectScreen} from '@screens/Connect';
import {HomeScreen} from '@screens/Home';
import {NavigationType} from '@src/types';

const Stack = createNativeStackNavigator();
export const NavigationScreens = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={NavigationType.HOME}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={NavigationType.HOME} component={HomeScreen} />
        <Stack.Screen
          name={NavigationType.CHECKOUT}
          component={CheckoutScreen}
        />
        <Stack.Screen name={NavigationType.CONNECT} component={ConnectScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
