import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './state/store';
import { HomeScreen, MapScreen } from './screens';
import { HOME_SCREEN, MAP_SCREEN } from './constants';

export type RootStackParamList = {
  [HOME_SCREEN]: undefined;
  [MAP_SCREEN]: undefined;
};
  
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName={HOME_SCREEN}>
            <Stack.Screen
              name={HOME_SCREEN}
              component={HomeScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name={MAP_SCREEN}
              component={MapScreen}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
