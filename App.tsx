import React from 'react';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { HomeScreen } from './screens';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
