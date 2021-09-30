import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Map, NavigateCard, RideOptionsCard } from '../components';
import { NAVIGATE_CARD, RIDE_OPTIONS_CARD } from '../constants';

const styles = StyleSheet.create({
  mapScreen_topView: {
    height: '50%',
  },
  mapScreen_bottomView: {
    height: '50%',
  }
});

export type MapScreenStackParamList = {
  [NAVIGATE_CARD]: undefined;
  [RIDE_OPTIONS_CARD]: undefined;
};
  
const Stack = createStackNavigator<MapScreenStackParamList>();

export function MapScreen() {
  return (
    <View>
      <View style={styles.mapScreen_topView}>
        <Map />
      </View>
      <View style={styles.mapScreen_bottomView}>
        <Stack.Navigator>
          <Stack.Screen
            name={NAVIGATE_CARD}
            component={NavigateCard}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name={RIDE_OPTIONS_CARD}
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
}