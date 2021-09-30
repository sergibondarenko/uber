import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { selectDestination, selectOrigin } from '../state/slices/navSlice';
import { UBER_APP_GOOGLE_API_KEY } from '@env';

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export function Map() {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
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
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={UBER_APP_GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

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