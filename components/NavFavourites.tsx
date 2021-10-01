import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  navFavourites__itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  navFavourites__itemIcon: {
    padding: 9,
    margin: 12,
    borderRadius: 9999,
    backgroundColor: '#d1d5db'
  },
  navFavourites__itemLocation: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 21    
  },
  navFavourites__itemDestination: {
    color: '#6b7280'
  },
  navFavourites__itemLineSeparator: {
    backgroundColor: '#e5e7eb',
    height: 0.5
  }
});

interface INavFavouritesOption {
  id: string;
  icon: string;
  location: string;
  destination: string;
}

const rideToHome: INavFavouritesOption = {
  id: '123',
  icon: 'home',
  location: 'Home',
  destination: '221b Baker St, London, UK'
};

const rideToWork: INavFavouritesOption = {
  id: '456',
  icon: 'briefcase',
  location: 'Work',
  destination: 'London Eye, London, UK'
};

export function NavFavouritesItem({ item }: { item: INavFavouritesOption }) {
  function handleItemPress(destination: string) {
    console.log('destination', destination);
  }

  return (
    <TouchableOpacity
      style={styles.navFavourites__itemContainer}
      onPress={() => handleItemPress(item.destination)}
    >
      <Icon
        style={styles.navFavourites__itemIcon}
        name={item.icon}
        type="ionicon"
        color="white"
        size={18}
      />
      <View>
        <Text style={styles.navFavourites__itemLocation}>{item.location}</Text>
        <Text style={styles.navFavourites__itemDestination}>{item.destination}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function NavFavourites() {
  const data = [rideToHome, rideToWork];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }: { item: INavFavouritesOption }) => <NavFavouritesItem item={item} />}
      ItemSeparatorComponent={() => (
        <View style={styles.navFavourites__itemLineSeparator} />
      )}
    />
  );
}