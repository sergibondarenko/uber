import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import MapViewDirections from 'react-native-maps-directions';
import { selectDestination, selectOrigin, INavStateDestination, INavStateOrigin, setTravelTimeInformation } from '../state/slices/navSlice';
import { UBER_APP_GOOGLE_API_KEY } from '@env';
import { DistanceMatrixService } from '../services';

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

function createMapCoordinates(props?: INavStateOrigin | INavStateDestination | null) {
  return {
    latitude: props?.location.lat || 0,
    longitude: props?.location.lng || 0
  };
}

export function Map() {
  const mapRef = useRef<MapView>(null)
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const markerDescription = origin?.description || undefined;
  const distMatrixService = new DistanceMatrixService({ apiKey: UBER_APP_GOOGLE_API_KEY });

  useEffect(() => {
    fitMapToCoordinates();
    calculateDistanceMatrix();
  }, [origin, destination]);

  function fitMapToCoordinates() {
    if (!origin || !destination) return;
    mapRef?.current?.fitToCoordinates(
      [
        createMapCoordinates(origin),
        createMapCoordinates(destination)
      ], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true
      }
    );
  }

  async function calculateDistanceMatrix() {
    if (!origin || !destination) return;
    const data = await distMatrixService.getTravelTime({
      origins: origin.description as string,
      destinations: destination.description as string
    });
    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
  }

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      mapType="mutedStandard"
      initialRegion={{
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
        ...createMapCoordinates(origin)
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
          coordinate={createMapCoordinates(origin)}
          title="Origin"
          description={markerDescription}
          identifier="origin"
        />
      )}
    </MapView>
  );
}