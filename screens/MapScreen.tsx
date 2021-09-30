import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Map } from '../components';

const styles = StyleSheet.create({
  mapScreen_topView: {
    height: '50%',
  },
  mapScreen_bottomView: {
    height: '50%',
  }
});

export function MapScreen() {
  return (
    <View>
      <View style={styles.mapScreen_topView}>
        <Map />
      </View>
      <View style={styles.mapScreen_bottomView}>
      </View>
    </View>
  );
}