import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setDestination } from '../state/slices/navSlice';
import { PlacesInput } from './PlacesInput';
import { RIDE_OPTIONS_CARD } from '../constants';
import { NavFavourites } from './NavFavourites';

const navigateCardStyles = StyleSheet.create({
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

const ridesButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    borderRadius: 9999,
    width: 92,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 9,
    paddingBottom: 9,
  },
  title: {
    fontSize: 16
  }
});

const eatsButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 9999,
    width: 92,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 9,
    paddingBottom: 9,
  },
  title: {
    color: 'black',
    fontSize: 16
  }
});

const bottomNav = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 6,
    paddingTop: 6,
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: '#f3f4f6'
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

export function RidesButton() {
  const navigation = useNavigation();

  return (
    <Button
      buttonStyle={ridesButtonStyles.button}
      titleStyle={ridesButtonStyles.title}
      title="Rides"
      icon={
        <Icon name="car" type="font-awesome" color="white" size={16} />
      }
      onPress={() => {
        navigation.navigate(RIDE_OPTIONS_CARD as never);
      }}
    />
  );
}

export function EatsButton() {
  return (
    <Button
      buttonStyle={eatsButtonStyles.button}
      titleStyle={eatsButtonStyles.title}
      title="Eats"
      icon={
        <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
      }
    />
  );
}

export function BottomNav() {
  return (
    <View style={bottomNav.container}>
      <RidesButton />
      <EatsButton />
    </View>
  );
}

export function NavigateCard() {
  return (
    <SafeAreaView style={navigateCardStyles.navigateCard}>
      <Text style={navigateCardStyles.navigateCard__text}>Hello!</Text>
      <View style={navigateCardStyles.navigateCard__placesInputContainer}>
        <RideToInput />
        <NavFavourites />
      </View>
      <BottomNav />
    </SafeAreaView>
  );
}