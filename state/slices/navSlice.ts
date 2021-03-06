import { createSlice } from '@reduxjs/toolkit';


export interface ILocation {
  lat: number;
  lng: number;
}

export interface INavStateOrigin {
  location: ILocation;
  description: undefined | string;
}

export interface INavStateDestination {
  location: ILocation;
  description: undefined | string;
}

export interface INavStateTravelTimeInformation {
  distance: { text: string, value: number },
  duration: { text: string, value: number },
  status: string
}

export interface INavState {
  origin: null | INavStateOrigin;
  destination: null | INavStateDestination;
  travelTimeInformation: null | INavStateTravelTimeInformation;
}

const initialState: INavState = {
  origin: null,
  destination: null,
  travelTimeInformation: null
};

export const counterSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    }
  }
});

export const { setOrigin, setDestination, setTravelTimeInformation } = counterSlice.actions;

export const selectOrigin = ({ nav }: { nav: INavState }) => nav.origin; 
export const selectDestination = ({ nav }: { nav: INavState }) => nav.destination;
export const selectTravelTimeInformation = ({ nav }: { nav: INavState }) => nav.travelTimeInformation;

export default counterSlice.reducer;