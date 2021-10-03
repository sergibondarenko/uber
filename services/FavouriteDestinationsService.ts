import { INavStateDestination } from '../state/slices/navSlice';

export interface IFavouriteDestinationOption {
  id: string;
  icon: string;
  location: string;
  destination: INavStateDestination;
}

export interface IFavouriteDestinationsService {
  fetchAll: () => Promise<Array<IFavouriteDestinationOption>>;
}

export class FavouriteDestinationsService implements IFavouriteDestinationsService {
  fetchAll() {
    return Promise.resolve([
      {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: {
          description: '221B Baker Street, London, UK',
          location: {
            lat: 51.523767,
            lng: -0.1585557,
          },
        }
      },
      {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: {
          description: 'Baskerville Hall Hotel, Clyro Court, Hereford HR3 5LE, UK',
          location: {
            lat: 52.0785816,
            lng: -3.1567497,
          },
        }
      }
    ]);
  }
}