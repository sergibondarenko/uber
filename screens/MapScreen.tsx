import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { Map, NavigateCard, RideOptionsCard } from '../components';
import { NAVIGATE_CARD, RIDE_OPTIONS_CARD, HOME_SCREEN } from '../constants';
import { useNavigation } from '@react-navigation/core';
import tw from 'tailwind-react-native-classnames';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../state/slices/navSlice';

export function MapMenuButton() {
  const nav = useNavigation();
  const dispatch = useDispatch();

  function handlePress() {
    dispatch(setDestination(null));
    dispatch(setOrigin(null));
    nav.navigate(HOME_SCREEN as never);
  }

  return(
    <TouchableOpacity
      style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full`}
      onPress={handlePress}
    >
      <Icon name="menu" />
    </TouchableOpacity>
  );
}

export type MapScreenStackParamList = {
  [NAVIGATE_CARD]: undefined;
  [RIDE_OPTIONS_CARD]: undefined;
};
  
const Stack = createStackNavigator<MapScreenStackParamList>();

export function MapScreen() {
  return (
    <View>
      <MapMenuButton />
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
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