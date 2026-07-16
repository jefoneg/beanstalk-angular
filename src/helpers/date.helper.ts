export class DateHelper {
  /**
   * Calculates the days from the current date.
   *
   * @param    {string}  utcDate  The utc date to calculate from.
   * @returns  {number}           The calculated days from the current date.
   */
  public static getDaysFromCurrentDate(utcDate: string): number {
    const currentDateTime: number = new Date().getTime();
    const utcDateTime: number = new Date(utcDate).getTime();
    const dayInMilliseconds: number = 86400000;

    return (currentDateTime - utcDateTime) / dayInMilliseconds;
  }

  /**
   * Calculates the hours from the current date.
   *
   * @param    {string}  utcDate  The utc date to calculate from.
   * @returns  {number}           The calculated hours from the current date.
   */
  public static getHoursFromCurrentDate(utcDate: string): number {
    const currentDateTime: number = new Date().getTime();
    const utcDateTime: number = new Date(utcDate).getTime();
    const hourInMilliseconds: number = 3600000;

    return (currentDateTime - utcDateTime) / hourInMilliseconds;
  }
}
