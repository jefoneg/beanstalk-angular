import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  public isEmailValid = signal(false);
  public isSubmitted = signal(false);

  /**
   * Sets the email validity signale variable.
   * 
   * @param    {boolean} isValid The action to be set.
   * @returns  {void}
   */
  public setEmailValidity(isValid: boolean): void {
    this.isEmailValid.set(isValid);
  }
  
  /**
   * Sets the button state signal variable.
   * 
   * @param    {boolean} isSubmitted  The action to be set.
   * @returns  {void}
   */
  public setButtonState(isSubmitted: boolean): void {
    this.isSubmitted.set(isSubmitted);
  }
}
