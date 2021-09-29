import React from 'react';
import { Image } from 'react-native';
import { IImageProps } from './types';

export function EatsImage(props: IImageProps) {
  return <Image {...props} source={require('./eats.png')} />
}