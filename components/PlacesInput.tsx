import React from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { UBER_APP_GOOGLE_API_KEY } from '@env';

export interface PlacesInputProps {
  styles?: Object;
  query?: Object;
  placeholder: string;
  onPress: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;
}

export function PlacesInput({ styles, query, placeholder, onPress }: PlacesInputProps) {    
  if (!query) {
    query = {
      key: UBER_APP_GOOGLE_API_KEY,
      language: 'en',
      // types: '(cities)'
    };
  }

  return (
    <GooglePlacesAutocomplete
      styles={styles}
      placeholder={placeholder}
      debounce={400}
      nearbyPlacesAPI="GooglePlacesSearch"
      listViewDisplayed
      enablePoweredByContainer={false}
      minLength={2}
      fetchDetails
      onPress={onPress}
      query={query}
    />
  );
}