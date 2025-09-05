/**
 * @format
 */
import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';

// Import components
import App from './App';
import store from './src/redux';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Require cycle:',
  'ViewPropTypes will be removed',
  'AsyncStorage has been extracted',
  'Warning: ...',
]);

// Ignore all logs in production
LogBox.ignoreAllLogs();

const MainApp = () => {
  try {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  } catch (error) {
    console.error('Error in MainApp:', error);
    return null;
  }
};

AppRegistry.registerComponent(appName, () => MainApp);
