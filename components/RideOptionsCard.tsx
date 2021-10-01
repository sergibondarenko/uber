import React, { useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { NAVIGATE_CARD } from '../constants';
import { IImage, UberXImage, UberXLImage, UberLUXImage } from '../components/images';

export interface INavigateBackButtonProps {
  onPress: () => void;
}

export function NavigateBackButton({ onPress }: INavigateBackButtonProps) {
  return (
    <TouchableOpacity
      style={tw`absolute left-5 p-3 rounded-full z-50`}
      onPress={onPress}
    >
      <Icon name="chevron-left" type="fontawesome" />
    </TouchableOpacity>
  );
}

interface IRideOption {
  id: string;
  title: string;
  multiplier: number;
  image: IImage;
}

const data = [
  {
    id: '123',
    title: 'UberX',
    multiplier: 1,
    image: UberXImage 
  },
  {
    id: '456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: UberXLImage 
  },
  {
    id: '789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: UberLUXImage 
  },
];

interface IRideListOptionProps {
  item: IRideOption;
  selectedItemId: string | undefined;
  onPress: () => void;
}

export function RideListOption({ item, selectedItemId, onPress }: IRideListOptionProps) {
  const RideImage = item.image;
  const isSelected = selectedItemId === item.id;

  return (
    <TouchableOpacity
      style={tw`flex-row items-center justify-between px-10 ${isSelected ? 'bg-gray-200' : ''}`}
      onPress={onPress}  
    >
      <RideImage style={{ width: 100, height: 100, resizeMode: 'contain' }} />
      <View style={tw`-ml-6`}>
        <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
        <Text>Travel time</Text>
      </View>
      <Text style={tw`text-xl`}>£99</Text>
    </TouchableOpacity>
  );
}

export interface ISelectRideButtonProps {
  item: IRideOption | null
}

export function SelectRideButton({ item }: ISelectRideButtonProps) {
  return (
    <TouchableOpacity disabled={!item} style={tw`bg-black py-2 m-2 ${!item ? 'bg-gray-300' : ''}`}>
      <Text style={tw`text-center text-white text-xl`}>Choose {item?.title}</Text>
    </TouchableOpacity>
  );
}

export function RideList() {
  const [selectedOption, setSelectedOption] = useState<IRideOption | null>(null);

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
          <RideListOption
            item={item}
            onPress={() => setSelectedOption(item)}
            selectedItemId={selectedOption?.id}
          />
        }
      />
      <View>
        <SelectRideButton item={selectedOption} />
      </View>
    </>
  );
}

export function RideOptionsCard() {
  const navigation = useNavigation();

  function handleNavigetBack() {
    navigation.navigate(NAVIGATE_CARD as never);
  }

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <NavigateBackButton onPress={handleNavigetBack} />
        <Text style={tw`text-center py-2 text-xl`}>
          Select a ride
        </Text>
      </View>
      <RideList />
    </SafeAreaView>
  );
}