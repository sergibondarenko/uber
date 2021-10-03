import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { FavouriteDestinationsService, IFavouriteDestinationOption } from '../services';

interface INavFavouritesItemProps {
  item: IFavouriteDestinationOption
}

export function NavFavouritesItem({ item }: INavFavouritesItemProps) {
  function handleItemPress(destination: string) {
    console.log('destination', destination);
  }

  return (
    <TouchableOpacity
      style={tw`flex-grow flex-row items-center p-5`}
      onPress={() => handleItemPress(item.destination)}
    >
      <Icon
        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
        name={item.icon}
        type="ionicon"
        color="white"
        size={18}
      />
      <View>
        <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
        <Text style={tw`text-gray-500`}>{item.destination}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function NavFavourites() {
  const [favouriteDestinations, setFavouriteDestinations] = useState<Array<IFavouriteDestinationOption>>([]);
  const favDestService = new FavouriteDestinationsService();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setFavouriteDestinations(await favDestService.fetchAll());
  }

  return (
    <FlatList
      data={favouriteDestinations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NavFavouritesItem item={item} />}
      ItemSeparatorComponent={() => (
        <View style={tw`bg-gray-200 h-px`} />
      )}
    />
  );
}