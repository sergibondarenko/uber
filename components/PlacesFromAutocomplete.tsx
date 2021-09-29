import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { UBER_APP_GOOGLE_API_KEY } from '@env';

const styles = StyleSheet.create({
  placesAutocomplete__container: {
    flex: 0
  },
  placesAutocomplete__textInput: {
    fontSize: 18
  }
});

export function PlacesFromAutocomplete() {
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
      query={{
        key: UBER_APP_GOOGLE_API_KEY,
        language: 'en',
        types: '(cities)'
      }}
    />
  );
}