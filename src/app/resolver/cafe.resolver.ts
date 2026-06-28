import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { catchError, EMPTY, finalize } from "rxjs";
import { CafeInformationModel } from "../../modes/cafe-information.model";
import { ApiService } from "../service/api-service";

/**
 * Resolves the data from the `getCafes()` API.
 *
 * @returns  {ResolveFn<CafeInformationModel[]>}   Returns the cafe data.
 */
export const cafeResolver: ResolveFn<CafeInformationModel[]> = () => {
  const apiService = inject(ApiService);

  apiService.setLoaderVisibility(true);

  return apiService.getCafes().pipe(
    catchError(() => {
      apiService.setLoaderVisibility(false);

      return EMPTY;
    }),
    finalize(() => {
      apiService.setLoaderVisibility(false);

      return EMPTY;
    }),
  );
};
