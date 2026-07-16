import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import {
  CafeInformationModel,
  CafeInformationResponse,
  CafeReviewComments,
  CafeReviews,
} from "../../modes/cafe-information.model";
import { ForgotPasswordPayload, LoginPayload, RegisterPayload } from "../../modes/payload.model";
import { StorageService } from "./storage/storage.service";
import { IGeneric } from "../interface/IGeneric.interface";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public showLoader = signal(false);

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
  ) {}

  /**
   * Concatinates the slash to the endpoint.
   *
   * @param    {string}  endpoint   The endpoint to concatinate.
   * @returns  {string}             The concattinated endpoint string.
   */
  private concatEndpoint(endpoint: string): string {
    return `${environment.API_URL}/${endpoint}`;
  }

  /**
   * Fetches cafes api.
   *
   * @returns  {Observable<CafeInformationModel[]>}  The cafe information from API.
   */
  public getCafes(): Observable<CafeInformationModel[]> {
    const payload = {
      email: this.storageService.getItem("email"),
    };

    return this.http
      .post<CafeInformationResponse>(this.concatEndpoint("cafes"), payload)
      .pipe(map((response) => response.data));
  }

  /**
   * Handles the login api post.
   *
   * @param    {LoginPayload}       payload  The payload that contains the needed credentials.
   * @returns  {Observable<any>}             Returns the result of the API.
   */
  public postLogin(payload: LoginPayload): Observable<any> {
    return this.http.post(this.concatEndpoint("login"), payload);
  }

  /**
   *
   * @param    {RegisterPayload}      payload The payload that contains user information.
   * @returns  {Observable<object>}           Returns the result of the API.
   */
  public postRegister(payload: RegisterPayload): Observable<Object> {
    return this.http.post(this.concatEndpoint("register"), payload);
  }

  /**
   * Handles the forgot password api post.
   *
   * @param    {ForgotPasswordPayload}  payload    The payload that contains necesarry information for validation.
   * @returns  {Observable<any>}                   Returns the result of the API.
   */
  public postForgotPassword(payload: ForgotPasswordPayload): Observable<any> {
    return this.http.post(this.concatEndpoint("forgot-password"), payload);
  }

  /**
   * Handles the check user access api post.
   *
   * @param    {email: string}   payload  The payload that contains the user access information.
   * @returns  {Observable<any>}           Returns the result of the API.
   */
  public postCheckUserAccess(payload: { email: string }): Observable<any> {
    return this.http.post(this.concatEndpoint("checkuser"), payload);
  }

  /**
   * This gets the necessary data related to the cafe to be reviewed.
   *
   * @param    {param: string}   payload The payload that contains the cafe param.
   * @returns  {Observable<any>}         Returns the result of the API.
   */
  public postCafeReviews(payload: { param: string }): Observable<any> {
    return this.http
      .post(this.concatEndpoint("cafe-reviews"), payload)
      .pipe(map((response) => new CafeReviews(response)));
  }

  /**
   * Handles the post cafe review comments api post.
   *
   * @param    {cafeId: string; pageNumber: number}   payload  The payload that contains the cafe review comments information.
   * @returns  {Observable<any>}                               Returns the result of the API.
   */
  public postCafeReviewComments(payload: {
    cafeId: string;
    pageNumber: number;
  }): Observable<CafeReviewComments[]> {
    return this.http.post<IGeneric[]>(this.concatEndpoint("cafe-review-comments"), payload).pipe(
      map((response) => {
        const consolidatedResponse: CafeReviewComments[] = [];

        response.forEach((data: IGeneric) => {
          consolidatedResponse.push(
            new CafeReviewComments(
              data["cafe_id"],
              data["created_at"],
              data["review_comment"],
              data["reviewer_name"],
              data["rating"],
            ),
          );
        });

        return consolidatedResponse;
      }),
    );
  }

  public postCafeComment(payload: any): Observable<any> {
    return this.http.post<any>(this.concatEndpoint("post-review"), payload);
  }

  /**
   * Sets the visibility of the loader.
   *
   * @param    {boolean} shouldShow  Whether the loader should be visible or not.
   * @returns  {void}
   */
  public setLoaderVisibility(shouldShow: boolean): void {
    this.showLoader.set(shouldShow);
  }
}
