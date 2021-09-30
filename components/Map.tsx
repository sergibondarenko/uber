import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../state/slices/navSlice';

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export function Map() {
  const origin = useSelector(selectOrigin);
  const latitude = origin?.location.lat || 0;
  const longitude = origin?.location.lng || 0;
  const markerDescription = origin?.description || undefined;

  return (
    <MapView
      style={styles.map}
      mapType="mutedStandard"
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{ latitude, longitude }}
          title="Origin"
          description={markerDescription}
          identifier="origin"
        />
      )}
    </MapView>
  );
}