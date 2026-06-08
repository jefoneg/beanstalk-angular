import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HomeHelpers } from '../../../../helpers/home-section.helper';
import { CafeInformationModel } from '../../../../modes/cafe-information.model';
import { HomeConstant } from '../../../../constants/home.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homesection-component',
  imports: [NgOptimizedImage],
  templateUrl: './homesection-component.html',
  styleUrl: './homesection-component.less',
})
export class HomesectionComponent {
  protected HomeHelpers = HomeHelpers;
  protected readonly HomeConstant = HomeConstant;

  @Input() sectionTitle: string;
  @Input() cafeInformation: CafeInformationModel[];
  @Input() viewMoreMode: string;

  constructor(private readonly router: Router) {}

  /**
   * Handles redirection to the cafe detail page.
   *
   * @param    {string} param  The cafe id to the cafe detail page.
   * @returns  {void}
   */
  protected onViewCafe(param: string): void {
    this.router.navigate(['/cafe', param]);
  }

  protected onViewMore(param: string): void {
    console.log(param);
  }
}
