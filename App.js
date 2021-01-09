import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as ReactReduxProvider } from 'react-redux';
import * as Notifications from 'expo-notifications';

import rootSaga from './sagas';
import reducers from './reducers';
import Navigation from './navigation';
import { AppThemeProvider } from './theme';

let sagaMiddleware;
let store;

if (__DEV__) {
  const reactotron = require('./ReactotronConfig').default;
  const sagaMonitor = reactotron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  store = createStore(
    reducers,
    compose(applyMiddleware(sagaMiddleware), reactotron.createEnhancer())
  );
} else {
  sagaMiddleware = createSagaMiddleware();
  store = createStore(reducers, applyMiddleware(sagaMiddleware));
}

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  componentDidMount() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  render() {
    return (
      <ReactReduxProvider store={store}>
        <SafeAreaProvider>
          <AppThemeProvider>
            <Navigation />
            <StatusBar style="auto" />
          </AppThemeProvider>
        </SafeAreaProvider>
      </ReactReduxProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
