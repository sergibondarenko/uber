import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { setDestination } from '../state/slices/navSlice';
import { PlacesInput } from './PlacesInput';
import { RIDE_OPTIONS_CARD } from '../constants';

const styles = StyleSheet.create({
  navigateCard: {
    backgroundColor: 'white',
    flex: 1
  },
  navigateCard__text: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 15,
    lineHeight: 21
  },
  navigateCard__placesInputContainer: {
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    flexShrink: 1 
  },
});

const rideToInputStyles = StyleSheet.create({
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
});

export function RideToInput() {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  return (
    <View>
      <PlacesInput
        styles={rideToInputStyles}
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

export function NavigateCard() {
  return (
    <SafeAreaView style={styles.navigateCard}>
      <Text style={styles.navigateCard__text}>Hello!</Text>
      <View style={styles.navigateCard__placesInputContainer}>
        <RideToInput />
      </View>
    </SafeAreaView>
  );
}