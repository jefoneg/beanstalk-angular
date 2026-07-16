import { IGeneric } from "../app/interface/IGeneric.interface";

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

export class CafeReviews {
  public cafeImage: string;
  public cafeInformation: string;
  public cafeName: string;
  public isActive: boolean;
  public minPriceRange: number;
  public maxPriceRange: number;
  public param: string;
  public rating: number;
  public tags: string[];

  constructor(public cafeReviewResponse: IGeneric) {
    this.cafeImage = this.getRandomImageBasedOnIndex(this.compileCafeImages(cafeReviewResponse));
    this.cafeInformation = cafeReviewResponse["cafeInformation"];
    this.cafeName = cafeReviewResponse["cafeName"];
    this.isActive = Boolean(cafeReviewResponse["isActive"]);
    this.minPriceRange = cafeReviewResponse["minPriceRange"];
    this.maxPriceRange = cafeReviewResponse["maxPriceRange"];
    this.param = cafeReviewResponse["param"];
    this.rating = cafeReviewResponse["rating"];
    this.tags = cafeReviewResponse["tags"];
  }

  /**
   * Gets a random image based on the index of the image in the cafeImages array.
   *
   * @param    {string[]}  cafeImages  The array of cafe images to compile.
   * @returns  {string}                The random image based on the index of the image in the cafeImages array.
   */
  private getRandomImageBasedOnIndex(cafeImages: string[]): string {
    return cafeImages[Math.floor(Math.random() * 5)];
  }

  /**
   * Compiles the cafe images from the cafe review response object.
   *
   * @param    {IGeneric}  cafeReview  The cafe review response object.
   * @returns  {string[]}              The array of cafe images compiled from the cafe review response object.
   */
  private compileCafeImages(cafeReview: IGeneric): string[] {
    const cafeImages: string[] = [];

    Object.keys(cafeReview)
      .filter((key) => key.includes("Image"))
      .forEach((item) => {
        cafeImages.push(cafeReview[item as keyof typeof cafeReview]);
      });

    return cafeImages;
  }
}

export class CafeReviewComments {
  constructor(
    public cafeId: string,
    public createdAt: string,
    public reviewComment: string,
    public reviewerName: string,
    public rating: number,
  ) {}
}
