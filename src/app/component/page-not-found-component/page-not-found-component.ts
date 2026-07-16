import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PageNotFoundConstant } from "../../../constants/page-not-found.constant";
import { RoutesEnum } from "../../../enums/routes.enum";

@Component({
  selector: "app-page-not-found-component",
  imports: [],
  templateUrl: "./page-not-found-component.html",
  styleUrl: "./page-not-found-component.less",
})
export class PageNotFoundComponent {
  protected readonly PageNotFoundConstant = PageNotFoundConstant;

  constructor(private router: Router) {}

  protected onButtonRedirect(): void {
    this.router.navigate([RoutesEnum.Home]);
  }
}
