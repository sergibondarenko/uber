export class PriceService {
  getNumberFormat() {
    return Promise.resolve({
      numberFormat: 'en-gb',
      style: 'currency',
      currency: 'GBP',
      surgeChargeRate: 1.5
    });
  }
}