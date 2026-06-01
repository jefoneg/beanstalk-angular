import { Component } from '@angular/core';
import { GetStartedConstant } from '../../../constants/get-started.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getstarted-component',
  imports: [],
  templateUrl: './getstarted-component.html',
  styleUrl: './getstarted-component.less',
})
export class GetstartedComponent {
  protected readonly GetStartedConstant = GetStartedConstant;
  protected isLoggedIn: boolean;

  /**
   * Constructs the GetstartedComponent.
   *
   * @param {Router} router The router service to navigate between routes.
   */
  constructor(private router: Router) {}

  /**
   * Runs when the component is initialized.
   *
   * @returns  {void}
   */
  public ngOnInit(): void {
    this.isLoggedIn = false;
  }

  /**
   * Determines the route where to redirect if user is logged in or not.
   *
   * @returns  {void}
   */
  protected onGetStarted(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }
}
