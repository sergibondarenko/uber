export interface IDistanceMatrixService {
  getTravelTime: ({ origins, destinations }: { origins: string, destinations: string }) => Object;
}

export class DistanceMatrixService implements IDistanceMatrixService {
  private apiKey;

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
  }

  getTravelTime({ origins, destinations }: { origins: string, destinations: string }) {
    const URI = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origins}&destinations=${destinations}&key=${this.apiKey}`;
    return fetch(URI).then((res) => res.json());
  }
}