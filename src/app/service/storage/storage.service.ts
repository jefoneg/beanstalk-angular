import { inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private document = inject(DOCUMENT);
  private window = this.document.defaultView;

  /**
   * Checks if its in the client side.
   *
   * @returns  {boolean}  Returns `true` if it is in the browser, otherwise `false`.
   */
  private get isBrowser(): boolean {
    return !!(this.window && this.window.sessionStorage);
  }

  /**
   * Saves the value to session storage.
   *
   * @param    {string} key     The key to the session storage.
   * @param    {any}    value   The value to bet set.
   * @returns  {void}
   */
  public setItem(key: string, value: any): void {
    if (this.isBrowser) {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      this.window!.sessionStorage.setItem(key, stringValue);
    }
  }

  /**
   * Gets the item from session storage.
   *
   * @param    {string}     key   The key of the saved data from session storage.
   * @returns  {T | null}         The value from session storage.
   */
  public getItem(key: string): any {
    if (!this.isBrowser) return null;

    const value = this.window!.sessionStorage.getItem(key);
    if (!value) return null;

    try {
      return JSON.parse(value) as any;
    } catch {
      return value as any;
    }
  }

  /**
   * Removes an item from session storage.
   *
   * @param    {string}   key   The key to be deleted from session storage.
   * @returns  {void}
   */
  public removeItem(key: string): void {
    if (this.isBrowser) {
      this.window!.sessionStorage.removeItem(key);
    }
  }

  /**
   * Clears all the saved data from session storage.
   *
   * @returns  {void}
   */
  public clear(): void {
    if (this.isBrowser) {
      this.window!.sessionStorage.clear();
    }
  }
}
