import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonConstant } from '../../constants/common.constant';

@Injectable({
  providedIn: 'root',
})
export class ResponsivePageService {
  /**
   * Constructs the ResponsivePageService.
   *
   * @param {Document} document The document object.
   */
  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Checks if the inner width of the window is within mobile view.
   *
   * @param    {number}   innerWidth   The inner width of the browser window.
   * @returns  {boolean}               Returns `true` if its within the mobile view window, `false` otherwise.
   */
  public isMobileView(innerWidth?: number): boolean {
    const currentInnerWidth = innerWidth
      ? innerWidth
      : (this.document.defaultView?.innerWidth ?? CommonConstant.NUMERIC.ZERO);

    return 768 > currentInnerWidth;
  }
}
