import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { CafeInformationModel, CafeInformationResponse } from "../../modes/cafe-information.model";
import { ForgotPasswordPayload, LoginPayload, RegisterPayload } from "../../modes/payload.model";
import { StorageService } from "./storage/storage.service";

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
   * @returns  {Observable<Object>}                Returns the result of the API.
   */
  public postForgotPassword(payload: ForgotPasswordPayload): Observable<any> {
    return this.http.post(this.concatEndpoint("forgot-password"), payload);
  }

  public postCheckUserAccess(payload: any): Observable<any> {
    return this.http.post(this.concatEndpoint("checkuser"), payload);
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
