import { Injectable, signal } from "@angular/core";
import { CafeReviewComments, CafeReviews } from "../../modes/cafe-information.model";

@Injectable({
  providedIn: "root",
})
export class CafeReviewService {
  public cafeReviewsResponse = signal<CafeReviews>({} as CafeReviews);
  public cafeReviewComments = signal<CafeReviewComments[]>([]);

  /**
   * Sets the cafe reviews response signal to the provided object.
   *
   * @param   {CafeReviews} object  The cafe reviews object to set the signal to.
   * @returns {void}
   */
  public setCafeReviews(object: CafeReviews): void {
    this.cafeReviewsResponse.set(object);
  }

  /**
   * Sets the cafe review comments signal to the provided array.
   *
   * @param    {CafeReviewComments[]} comments The array of cafe review comments to set the signal to.
   * @returns  {void}
   */
  public setCafeReviewComments(comments: CafeReviewComments[]): void {
    this.cafeReviewComments.set(comments);
  }
}
