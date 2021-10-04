import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { NAVIGATE_CARD } from '../constants';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../state/slices/navSlice';
import { PriceService, RideOptionsService, IRideOption, IPriceNumberFormat } from '../services';
import { UberXImage, UberXLImage, UberLUXImage } from '../components/images';
import 'intl'; // Must import it to make the app work on the real Android device.
import 'intl/locale-data/jsonp/en'; // Must import it to make the app work on the real Android device. 

const rideImages = {
  uberx: UberXImage,
  uberxl: UberXLImage,
  uberlux: UberLUXImage
};

export interface INavigateBackButtonProps {
  onPress: () => void;
}

export function NavigateBackButton({ onPress }: INavigateBackButtonProps) {
  return (
    <TouchableOpacity
      style={tw`absolute left-5 p-3 py-6 rounded-full z-50`}
      onPress={onPress}
    >
      <Icon name="chevron-left" type="fontawesome" />
    </TouchableOpacity>
  );
}

interface IRideListOptionProps {
  item: IRideOption;
  priceFormat: IPriceNumberFormat | null;
  selectedItemId: string | undefined;
  onPress: () => void;
}

export function RideListOption({ item, priceFormat, selectedItemId, onPress }: IRideListOptionProps) {
  const travelTimeInfo = useSelector(selectTravelTimeInformation);
  const RideImage = rideImages[item.image];
  const isSelected = selectedItemId === item.id;

  function renderPrice() {
    if (!travelTimeInfo?.duration?.value || !priceFormat) return 'Unavailable';
    return Intl.NumberFormat(priceFormat.numberFormat, { style: priceFormat.style, currency: priceFormat.currency })
      .format(travelTimeInfo.duration.value * priceFormat.surgeChargeRate * item.multiplier / 100);
  }

  return (
    <TouchableOpacity
      style={tw`flex-row items-center justify-between px-4 ${isSelected ? 'bg-gray-200' : ''}`}
      onPress={onPress}  
    >
      <RideImage style={{ width: 100, height: 100, resizeMode: 'contain' }} />
      <View style={tw`flex-1`}>
        <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
        <Text>{travelTimeInfo?.duration?.text} travel time</Text>
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
    <TouchableOpacity disabled={!item} style={tw`bg-black py-3 m-3 ${!item ? 'bg-gray-300' : ''}`}>
      <Text style={tw`text-center text-white text-xl`}>Choose {item?.title}</Text>
    </TouchableOpacity>
  );
}

export function RideList() {
  const priceService = new PriceService();
  const rideOptionsService = new RideOptionsService();
  const [selectedOption, setSelectedOption] = useState<IRideOption | null>(null);
  const [priceFormat, setPriceFormat] = useState<IPriceNumberFormat | null>(null);
  const [rideOptions, setRideOptions] = useState<Array<IRideOption>>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [priceFormat, rideOptions] = await Promise.all([
      priceService.getNumberFormat(),
      rideOptionsService.fetchAll()
    ])
    setPriceFormat(priceFormat);
    setRideOptions(rideOptions);
  }

  return (
    <>
      <FlatList
        data={rideOptions}
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
      <View style={tw`border-b border-gray-200`}>
        <NavigateBackButton onPress={handleNavigetBack} />
        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride {travelTimeInfo?.distance?.text}
        </Text>
      </View>
      <RideList />
    </SafeAreaView>
  );
}