import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as ReactReduxProvider } from 'react-redux';
import reactotron from './ReactotronConfig';

import rootSaga from './sagas';
import reducers from './reducers';
import Navigation from './navigation';
import { AppPaperThemeProvider } from './theme';

const sagaMonitor = reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware), reactotron.createEnhancer())
);
sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <ReactReduxProvider store={store}>
      <SafeAreaProvider>
        <AppPaperThemeProvider>
          <Navigation />
          <StatusBar style="light" />
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
