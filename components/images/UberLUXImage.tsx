import React from 'react';
import { Image } from 'react-native';
import { IImageProps } from './types';

export function UberLUXImage(props: IImageProps) {
  return <Image {...props} source={require('./uber_lux.png')} />
}