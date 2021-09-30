import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { NavOptions, PlacesInput } from '../components';
import { UberImage } from '../components/images';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../state/slices/navSlice';

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: 'white',
    height: '100%'
  },
  homeScreen__view: {
    padding: 20,
    flexDirection: 'column'
  },
  homeScreen__image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});

const rideFromInputStyles = StyleSheet.create({
  container: {
    flex: 0
  },
  textInput: {
    fontSize: 18
  }
});

export function Logo() {
  return <UberImage style={styles.homeScreen__image} />;
}

export function RideFromInput() {
  const dispatch = useDispatch();

  return (
    <PlacesInput
      styles={rideFromInputStyles}
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
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.homeScreen__view}>
        <Logo />
        <RideFromInput />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
}