import { Component } from "@angular/core";
import { GetStartedConstant } from "../../../constants/get-started.constant";
import { Router } from "@angular/router";
import { RoutesEnum } from "../../../enums/routes.enum";
import { StorageService } from "../../service/storage/storage.service";
import { SessionKeyConstant } from "../../../constants/session-key.constant";
import { ApiService } from "../../service/api-service";

@Component({
  selector: "app-getstarted-component",
  imports: [],
  templateUrl: "./getstarted-component.html",
  styleUrl: "./getstarted-component.less",
})
export class GetstartedComponent {
  protected readonly GetStartedConstant = GetStartedConstant;
  protected isLoggedIn: boolean;

  /**
   * Constructs the GetstartedComponent.
   *
   * @param {Router}          router          The router service to navigate between routes.
   * @param {StorageService}  storageService  The service responsible for interacting with session storages.
   * @param {ApiService}      apiService      The service responsible for making API requests.
   */
  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly apiService: ApiService,
  ) {}

  /**
   * Runs when the component is initialized.
   *
   * @returns  {void}
   */
  public ngOnInit(): void {
    if (this.storageService.getItem(SessionKeyConstant.EMAIL)) {
      this.consolidateRedirect();
    }
  }

  /**
   * Consolidates the redirect logic based on the user's login status.
   *
   * @returns  {void}
   */
  private consolidateRedirect(): void {
    this.apiService
      .postCheckUserAccess({ email: this.storageService.getItem(SessionKeyConstant.EMAIL) })
      .subscribe({
        next: (data) => {
          this.storageService.setItem(SessionKeyConstant.USER_ACCESS, data);
          this.router.navigate([RoutesEnum.Home]);
        },
        error: () => {
          this.router.navigate([RoutesEnum.Login]);
        },
      });
  }

  /**
   * Determines the route where to redirect if user is logged in or not.
   *
   * @returns  {void}
   */
  protected onGetStarted(): void {
    if (!this.isLoggedIn) {
      this.router.navigate([RoutesEnum.Login]);
    } else {
      this.router.navigate([RoutesEnum.Home]);
    }
  }
}
