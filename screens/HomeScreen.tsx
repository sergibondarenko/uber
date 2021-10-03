import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NavOptions, PlacesInput, NavFavourites } from '../components';
import { UberImage } from '../components/images';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../state/slices/navSlice';
import tw from 'tailwind-react-native-classnames';

export function Logo() {
  return <UberImage style={{ width: 100, height: 100, resizeMode: 'contain' }} />;
}

export function RideFromInput() {
  const dispatch = useDispatch();

  return (
    <PlacesInput
      styles={{
        container: { flex: 0 },
        textInput: { fontSize: 18 }
      }}
      placeholder="Where from?"
      onPress={(data, details) => {
        dispatch(setOrigin({
          location: details?.geometry.location,
          description: data.description
        }));
        dispatch(setDestination(null));
      }}
    />
  );
}

export function HomeScreen() {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Logo />
        <RideFromInput />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
}