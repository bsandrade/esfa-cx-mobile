// import AppLegacy from '@src/AppLegacy';
import {Hooks} from '@src/hooks';
import {NavigationScreens} from '@src/navigation';
import {appEmitter} from '@src/shared/app-emitter';
import {DefaultCustomTheme} from '@themes/default';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {
    return () => {
      console.log('[app-effect] clossing...');
      appEmitter.emit('close');
    };
  });

  return (
    // <AppLegacy />
    <Hooks>
      <StatusBar
        backgroundColor={DefaultCustomTheme.colors.background}
        barStyle={'dark-content'}
      />
      <NavigationScreens />
    </Hooks>
  );
}

export default App;
