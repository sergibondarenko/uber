import React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { EatsImage, RideImage, IImage } from './images';

const styles = StyleSheet.create({
  navList__image: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  }
});

export interface INavOption {
  id: string;
  title: string;
  screen: string;
  image: IImage;
}

const rideNavOption: INavOption = {
  id: '123',
  title: 'Get a ride',
  screen: 'MapScreen',
  image: RideImage
};

const eatNavOption: INavOption = {
  id: '456',
  title: 'Order food',
  screen: 'EatsScreen',
  image: EatsImage
};

const navData: Array<INavOption> = [rideNavOption, eatNavOption];

export function NavList() {
  function renderNavItem({ item }: { item: INavOption }) {
    const NavImage = item.image;

    return (
      <TouchableOpacity>
        <Text>{item.title}</Text>
        <NavImage style={styles.navList__image} />
      </TouchableOpacity>
    );
  }

  function keyExtractor(item: INavOption) {
    return item.id;
  }

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={keyExtractor}
      renderItem={renderNavItem}
    />
  );
}

export function NavOptions() {
  return (
    <NavList />
  );
}