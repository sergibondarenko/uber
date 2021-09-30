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
  },
  placesInput__container: {
    flex: 0
  },
  placesInput__textInput: {
    fontSize: 18
  }
});

export function Logo() {
  return <UberImage style={styles.homeScreen__image} />;
}

export function HomeScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.homeScreen__view}>
        <Logo />
        <PlacesInput
          styles={{
            container: styles.placesInput__container,
            textInput: styles.placesInput__textInput
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
        <NavOptions />
      </View>
    </SafeAreaView>
  );
}