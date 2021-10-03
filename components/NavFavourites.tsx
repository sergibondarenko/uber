import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { FavouriteDestinationsService, IFavouriteDestinationOption } from '../services';
import { setDestination, setOrigin } from '../state/slices/navSlice';
import { MAP_SCREEN, RIDE_OPTIONS_CARD } from '../constants';
import { NavPoint } from '../types';

interface INavFavouritesItemProps {
  item: IFavouriteDestinationOption;
  onPress: (item: IFavouriteDestinationOption) => void;
}

export function NavFavouritesItem({ item, onPress }: INavFavouritesItemProps) {
  function handleOnPress() {
    onPress(item);
  }

  return (
    <TouchableOpacity
      style={tw`flex-grow flex-row items-center p-5`}
      onPress={handleOnPress}
    >
      <Icon
        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
        name={item.icon}
        type="ionicon"
        color="white"
        size={18}
      />
      <View style={tw`flex-1`}>
        <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
        <Text style={tw`text-gray-500`}>{item.destination.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

export interface INavFavouritesProps {
  navPoint: NavPoint;
}

export function NavFavourites({ navPoint }: INavFavouritesProps) {
  const [favouriteDestinations, setFavouriteDestinations] = useState<Array<IFavouriteDestinationOption>>([]);
  const favDestService = new FavouriteDestinationsService();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setFavouriteDestinations(await favDestService.fetchAll());
  }

  function handleFavouriteDirectionPress(item: IFavouriteDestinationOption) {
    if (navPoint === 'start') {
      dispatch(setOrigin({
        location: item.destination.location,
        description: item.destination.description
      }));
      dispatch(setDestination(null));
      navigation.navigate(MAP_SCREEN as never);
    } else if (navPoint === 'finish') {
      dispatch(setDestination({
        location: item.destination.location,
        description: item.destination.description
      }));
      navigation.navigate(RIDE_OPTIONS_CARD as never);
    }
  }

  return (
    <FlatList
      data={favouriteDestinations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NavFavouritesItem item={item} onPress={handleFavouriteDirectionPress} />}
      ItemSeparatorComponent={() => (
        <View style={tw`bg-gray-200 h-px`} />
      )}
    />
  );
}