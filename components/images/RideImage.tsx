import React from 'react';
import { Image } from 'react-native';
import { IImageProps } from './types';

export function RideImage(props: IImageProps) {
  return <Image {...props} source={require('./ride.png')} />
}