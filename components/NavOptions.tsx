import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { EatsImage, RideImage, IImage } from './images';
import { MAP_SCREEN, EATS_SCREEN } from '../constants';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../state/slices/navSlice';
import tw from 'tailwind-react-native-classnames';

export interface INavOption {
  id: string;
  title: string;
  screen: string;
  image: IImage;
}

const rideNavOption: INavOption = {
  id: '123',
  title: 'Get a ride',
  screen: MAP_SCREEN,
  image: RideImage
};

const eatNavOption: INavOption = {
  id: '456',
  title: 'Order food',
  screen: EATS_SCREEN,
  image: EatsImage
};

export function NavNextIcon() {
  return  <Icon
    style={tw`p-2 bg-black rounded-full w-10 mt-4`}
    name="arrowright"
    color="white"
    type="antdesign"
  />;
}

interface INavListItemProps {
  item: INavOption,
}

export function NavListItem({ item }: INavListItemProps) {
  const NavImage = item.image;
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  function handleItemPress(screenName: string) {
    navigation.navigate(screenName as never);
  }

  return (
    <TouchableOpacity
      disabled={!origin}
      style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
      onPress={() => handleItemPress(item.screen)}
    >
      <View style={!origin && { opacity: 0.2 }}>
        <NavImage style={{ width: 120, height: 120, resizeMode: 'contain' }} />
        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
        <NavNextIcon /> 
      </View>
    </TouchableOpacity>
  );
}

export function NavList() {
  const navData: Array<INavOption> = [rideNavOption, eatNavOption];

  function keyExtractor(item: INavOption) {
    return item.id;
  }

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={keyExtractor}
      renderItem={({ item }) => <NavListItem item={item} />}
    />
  );
}

export function NavOptions() {
  return (
    <NavList />
  );
}