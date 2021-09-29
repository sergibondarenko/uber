import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavOptions } from '../components';
import { UberImage } from '../components/images';

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: 'white',
    height: '100%'
  },
  homeScreen__view: {
    padding: 20
  },
  homeScreen__image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});

export function Logo() {
  return <UberImage style={styles.homeScreen__image} />;
}

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.homeScreen__view}>
        <Logo />
        <NavOptions />
      </View>
    </SafeAreaView>
  );
}