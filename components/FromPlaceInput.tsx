import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { UBER_APP_GOOGLE_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin, selectOrigin } from '../state/slices/navSlice';

const styles = StyleSheet.create({
  placesAutocomplete__container: {
    flex: 0
  },
  placesAutocomplete__textInput: {
    fontSize: 18
  }
});

export function FromPlaceInput() {    
  const dispatch = useDispatch();

  function pressHandler(data: GooglePlaceData, details: GooglePlaceDetail | null) {
    dispatch(setOrigin({
      location: details?.geometry.location,
      description: data.description,
    }));
    dispatch(setDestination(null))
  }

  const query = {
    key: UBER_APP_GOOGLE_API_KEY,
    language: 'en',
    // types: '(cities)'
  };

  return (
    <GooglePlacesAutocomplete
      styles={{
        container: styles.placesAutocomplete__container,
        textInput: styles.placesAutocomplete__textInput
      }}
      placeholder="Where from?"
      debounce={400}
      nearbyPlacesAPI="GooglePlacesSearch"
      listViewDisplayed
      enablePoweredByContainer={false}
      minLength={2}
      fetchDetails
      onPress={pressHandler}
      query={query}
    />
  );
}