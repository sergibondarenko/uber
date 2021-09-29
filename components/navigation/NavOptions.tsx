import React from 'react';
import { Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { EatsImage, RideImage, IImage } from '../images';
import { MAP_SCREEN, EATS_SCREEN, HOME_SCREEN } from '../../constants';

export type RootStackParamList = {
  [HOME_SCREEN]: undefined;
  [MAP_SCREEN]: undefined;
};

const styles = StyleSheet.create({
  navList__item: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#e5e7eb'
  },
  navList__itemImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  navList__itemText: {
    margin: 5,
    fontSize: 13,
    lineHeight: 13,
    fontWeight: '600'
  },
  navList__itemNextIcon: {
    width: 28,
    padding: 2,
    marginTop: 4,
    backgroundColor: 'black',
    borderRadius: 9999
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
  return <Icon style={styles.navList__itemNextIcon} name="arrowright" color="white" type="antdesign" />;
}

export function NavList() {
  const navigation = useNavigation();
  const navData: Array<INavOption> = [rideNavOption, eatNavOption];

  function handleItemPress(screenName: string) {
    navigation.navigate(screenName as never);
  }

  function renderItem({ item }: { item: INavOption }) {
    const NavImage = item.image;

    return (
      <TouchableOpacity style={styles.navList__item} onPress={() => handleItemPress(item.screen)}>
        <NavImage style={styles.navList__itemImage} />
        <Text style={styles.navList__itemText}>{item.title}</Text>
        <NavNextIcon /> 
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
      renderItem={renderItem}
    />
  );
}

export function NavOptions() {
  return (
    <NavList />
  );
}