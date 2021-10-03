import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { NAVIGATE_CARD } from '../constants';
import { IImage, UberXImage, UberXLImage, UberLUXImage } from '../components/images';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../state/slices/navSlice';
import { PriceService } from '../services';

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
  priceFormat: IPriceFormat | null;
  selectedItemId: string | undefined;
  onPress: () => void;
}

export function RideListOption({ item, priceFormat, selectedItemId, onPress }: IRideListOptionProps) {
  const travelTimeInfo = useSelector(selectTravelTimeInformation);
  const RideImage = item.image;
  const isSelected = selectedItemId === item.id;

  function renderPrice() {
    if (!travelTimeInfo || !priceFormat) return null;
    return Intl.NumberFormat(priceFormat.numberFormat, { style: priceFormat.style, currency: priceFormat.currency })
      .format(travelTimeInfo?.duration.value * priceFormat.surgeChargeRate * item.multiplier / 100);
  }

  return (
    <TouchableOpacity
      style={tw`flex-row items-center justify-between px-10 ${isSelected ? 'bg-gray-200' : ''}`}
      onPress={onPress}  
    >
      <RideImage style={{ width: 100, height: 100, resizeMode: 'contain' }} />
      <View style={tw`-ml-6`}>
        <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
        <Text>{travelTimeInfo?.duration.text} travel time</Text>
      </View>
      <Text style={tw`text-xl`}>{renderPrice()}</Text>
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

export interface IPriceFormat {
  numberFormat: string;
  style: string;
  currency: string;
  surgeChargeRate: number;
}

export function RideList() {
  const priceService = new PriceService();
  const [selectedOption, setSelectedOption] = useState<IRideOption | null>(null);
  const [priceFormat, setPriceFormat] = useState<IPriceFormat | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setPriceFormat(await priceService.getNumberFormat());
  }

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
          <RideListOption
            item={item}
            priceFormat={priceFormat}
            onPress={() => setSelectedOption(item)}
            selectedItemId={selectedOption?.id}
          />
        }
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <SelectRideButton item={selectedOption} />
      </View>
    </>
  );
}

export function RideOptionsCard() {
  const navigation = useNavigation();
  const travelTimeInfo = useSelector(selectTravelTimeInformation);

  function handleNavigetBack() {
    navigation.navigate(NAVIGATE_CARD as never);
  }

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <NavigateBackButton onPress={handleNavigetBack} />
        <Text style={tw`text-center py-2 text-xl`}>
          Select a ride {travelTimeInfo?.distance.text}
        </Text>
      </View>
      <RideList />
    </SafeAreaView>
  );
}