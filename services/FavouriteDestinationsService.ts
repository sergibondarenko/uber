export interface IFavouriteDestinationOption {
  id: string;
  icon: string;
  location: string;
  destination: string;
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
        destination: '221b Baker St, London, UK'
      },
      {
        id: '456',
        icon: 'briefcase',
        location: 'Work',
        destination: 'London Eye, London, UK'
      }
    ]);
  }
}