export interface IRideOption {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}

export interface IRideOptionsService {
  fetchAll: () => Promise<Array<IRideOption>>;
}

export class RideOptionsService implements IRideOptionsService {
  fetchAll() {
    const data = [
      {
        id: '123',
        title: 'UberX',
        multiplier: 1,
        image: 'uberx' 
      },
      {
        id: '456',
        title: 'Uber XL',
        multiplier: 1.2,
        image: 'uberxl'
      },
      {
        id: '789',
        title: 'Uber LUX',
        multiplier: 1.75,
        image: 'uberlux'
      },
    ];

    return Promise.resolve(data);
  }
}