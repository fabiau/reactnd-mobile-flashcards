import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as ReactReduxProvider } from 'react-redux';

import rootSaga from './sagas';
import reducers from './reducers';
import Navigation from './navigation';
import { AppPaperThemeProvider } from './theme';

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

export default function App() {
  return (
    <ReactReduxProvider store={store}>
      <SafeAreaProvider>
        <AppPaperThemeProvider>
          <Navigation />
          <StatusBar style="auto" />
        </AppPaperThemeProvider>
      </SafeAreaProvider>
    </ReactReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
