import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { NavigationItems } from "../../../../constants/nav-items.constant";
import { NavBarConstant } from "../../../../constants/navbar.constant";
import { RoutesConstant } from "../../../../constants/valid-routes..constant";
import { SeparatorEnum } from "../../../../enums/separator.enum";
import { StorageService } from "../../../service/storage/storage.service";
import { SessionKeyConstant } from "../../../../constants/session-key.constant";
import { RoutesEnum } from "../../../../enums/routes.enum";

@Component({
  selector: "app-navbar-component",
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: "./navbar-component.html",
  styleUrl: "./navbar-component.less",
})
export class NavbarComponent {
  private routerSubscription: Subscription;
  protected shouldShowNavbar: boolean;
  protected readonly NavigationItems = NavigationItems;
  protected isLinkActive: boolean;
  protected currentUrl: string;
  protected readonly NavBarConstant = NavBarConstant;
  protected isLoggedIn: boolean;

  /**
   * Constructs the Navbar Component.
   *
   * @param  {Router}          router           Service responsible for getting the route data.
   * @param  {StorageService}  storageService   Service responsible for interacting with WEB Storage API.
   */
  constructor(
    private readonly router: Router,
    private storageService: StorageService,
  ) {}

  /**
   * An angular lifecyclehook that runs when component is initialized.
   *
   * @returns  {void}
   */
  public ngOnInit(): void {
    this.initializeRouterEvents();
  }

  /**
   * Initialize router events based on the app url.
   *
   * @returns  {void}
   */
  private initializeRouterEvents(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.shouldShowNavbar = RoutesConstant.NAVIGATION_VALID_ROUTES.some(
          (route) =>
            `${SeparatorEnum.Slash}${route}` === event.url ||
            event.url.includes(`${SeparatorEnum.Slash}${route}`),
        );
        this.currentUrl = event.url;
      });
  }

  /**
   * An angular lifecyclehook that runs when component is destroyed.
   *
   * @returns  {void}
   */
  public ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  /**
   * Navigates to the specified route.
   *
   * @param    {string} route The route to navigate to.
   * @returns  {void}
   */
  protected navigateToRoute(route: string): void {
    const routerNavigate = (toRoute?: string) => {
      const getRoute = toRoute || route;

      this.router.navigate([getRoute]);
    };

    if (!Boolean(this.storageService.getItem(SessionKeyConstant.EMAIL))) {
      const anonUserAllowedRoutes = [RoutesEnum.Home, RoutesEnum.Cafes];

      if (
        anonUserAllowedRoutes.some(
          (allowedRoute) => `/${allowedRoute}` === route || allowedRoute.includes(route),
        )
      ) {
        routerNavigate();
      } else {
        routerNavigate(RoutesEnum.Login);
      }
    } else {
      routerNavigate();
    }
  }
}
