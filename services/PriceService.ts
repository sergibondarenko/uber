export interface IPriceNumberFormat {
  numberFormat: string;
  style: string;
  currency: string;
  surgeChargeRate: number;
}

export interface IPriceService {
  getNumberFormat: () => Promise<IPriceNumberFormat>;
}

export class PriceService implements IPriceService {
  getNumberFormat() {
    return Promise.resolve({
      numberFormat: 'en-gb',
      style: 'currency',
      currency: 'GBP',
      surgeChargeRate: 1.5
    });
  }
}