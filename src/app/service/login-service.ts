import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public signalMessage$ = signal("");

  /**
   * Forms a capitalized word.
   *
   * @param    {string}  word  The word to be capitalized.
   * @returns  {string}        The capitalized word.
   */
  public capitalize(word: string): string {
    if (!word) return word;

    return word.toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase());
  }

  /**
   * Sets the signal message.
   *
   * @param    {string}  message  The message to set.
   * @returns  {void}
   */
  public setSignalMessage(message: string): void {
    this.signalMessage$.set(message);
  }
}
