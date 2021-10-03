import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, setDestination } from '../state/slices/navSlice';
import { PlacesInput } from './PlacesInput';
import { RIDE_OPTIONS_CARD } from '../constants';
import { NavFavourites } from './NavFavourites';
import tw from 'tailwind-react-native-classnames';

export function RideToInput() {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  return (
    <View>
      <PlacesInput
        styles={{
          container: {
            backgroundColor: 'white',
            paddingTop: 20,
            flex: 0
          },
          textInput: {
            backgroundColor: '#DDDDDF',
            borderRadius: 0,
            fontSize: 18
          },
          textInputContainer: {
            paddingHorizontal: 20,
            paddingBottom: 0
          }
        }}
        placeholder="Where to?"
        onPress={(data, details) => {
          dispatch(setDestination({
            location: details?.geometry.location,
            description: data.description
          }));
          navigation.navigate(RIDE_OPTIONS_CARD as never);
        }}
      />
    </View>
  );
}

export function RidesButton() {
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  return (
    <TouchableOpacity
      disabled={!destination}
      style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full ${!destination ? 'bg-gray-300' : ''}`}
      onPress={() => {
        navigation.navigate(RIDE_OPTIONS_CARD as never);
      }}
    >
      <Icon name="car" type="font-awesome" color="white" size={16} />
      <Text style={tw`text-white text-center`}>Rides</Text>
    </TouchableOpacity>
  );
}

export function EatsButton() {

  return (
    <TouchableOpacity
      style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full`}
    >
      <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
      <Text style={tw`text-black text-center`}>Eats</Text>
    </TouchableOpacity>
  );
}

export function BottomNav() {
  return (
    <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
      <RidesButton />
      <EatsButton />
    </View>
  );
}

export function NavigateCard() {
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Hello!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <RideToInput />
        <NavFavourites />
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}