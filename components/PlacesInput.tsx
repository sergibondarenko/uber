import React, { useRef, useEffect } from 'react';
import { GooglePlacesAutocomplete, GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { UBER_APP_GOOGLE_API_KEY } from '@env';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../state/slices/navSlice';
import { NavPoint } from '../types';

export interface PlacesInputProps {
  styles?: Object;
  query?: Object;
  navPoint: NavPoint; 
  placeholder: string;
  onPress: (data: GooglePlaceData, details: GooglePlaceDetail | null) => void;
}

export function PlacesInput({ styles, query, placeholder, onPress, navPoint }: PlacesInputProps) {    
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  if (!query) {
    query = {
      key: UBER_APP_GOOGLE_API_KEY,
      language: 'en',
      // types: '(cities)'
    };
  }

  useEffect(() => {
    setInputText();
  }, [origin, destination]);

  function setInputText() {
    const origDescr = origin?.description || '';
    const destDescr = destination?.description || '';

    if (navPoint === 'start') {
      ref?.current?.setAddressText(origDescr);
    } else if (navPoint === 'finish') {
      ref?.current?.setAddressText(destDescr);
    }
  }

  return (
    <GooglePlacesAutocomplete
      ref={ref}
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