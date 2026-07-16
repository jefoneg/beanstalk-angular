export class HomeHelpers {
  public static getCafeImage(imgSrc: string): string {
    return imgSrc ? imgSrc : '';
  }

  public static displayPriceRange(minRange: number, maxRange: number, currency: string): string {
    return `${'Philippine Peso' === currency ? 'Php' : ''} ${minRange ?? 0} - ${maxRange ?? 0}`;
  }
}
