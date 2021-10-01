import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { NAVIGATE_CARD } from '../constants';

export interface INavigateBackButtonProps {
  onPress: () => void;
}

export function NavigateBackButton({ onPress }: INavigateBackButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}
    >
      <Icon name="chevron-left" type="fontawesome" />
    </TouchableOpacity>
  );
}

export function RideOptionsCard() {
  const navigation = useNavigation();

  function handleNavigetBack() {
    navigation.navigate(NAVIGATE_CARD as never);
  }

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <NavigateBackButton onPress={handleNavigetBack} />
        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride
        </Text>
      </View>
    </SafeAreaView>
  );
}