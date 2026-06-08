export class CafeInformationModel {
  constructor(
    public cafeName: string,
    public imgSrc: string,
    public rating: string,
    public currency: string,
    public minPriceRange: number,
    public maxPriceRange: number,
    public location: string,
    public param: string,
    public tags: string[],
  ) {}
}

export class CafeInformationResponse {
  constructor(
    public count: number,
    public data: CafeInformationModel[],
    public error: any,
    public status: number,
    public statusText: string,
    public success: boolean,
  ) {}
}
