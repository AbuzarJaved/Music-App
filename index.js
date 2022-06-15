/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import React, {useRef} from 'react';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import {ReduxNetworkProvider} from 'react-native-offline';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';

const RootComponent = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ReduxNetworkProvider>
          <NativeBaseProvider>
            <NavigationContainer>
              <App />
            </NavigationContainer>
          </NativeBaseProvider>
        </ReduxNetworkProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RootComponent);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
