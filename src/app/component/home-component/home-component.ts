import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CafeInformation } from '../../../constants/cafe-information';
import { HomeConstant } from '../../../constants/home.constant';
import { CafeInformationModel } from '../../../modes/cafe-information.model';
import { HomesectionComponent } from '../child-component/homesection-component/homesection-component';

@Component({
  selector: 'app-home-component',
  imports: [HomesectionComponent, CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.less',
})
export class HomeComponent {
  protected readonly CafeInformation = CafeInformation;
  protected readonly HomeConstant = HomeConstant;
  protected cafeInformation: CafeInformationModel[];

  /**
   * Constructs the home component.
   *
   * @param {Router}         router   Service for routers.
   * @param {ActivatedRoute} route    Service for activated routes.
   */
  constructor(
    public readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  /**
   * An angular lifecycle hook that runs when component is initialized.
   * 
   * @returns  {void}
   */
  public ngOnInit(): void {
    this.cafeInformation = this.route.snapshot.data['cafes'];
  }
}
