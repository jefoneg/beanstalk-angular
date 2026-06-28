import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { CafeInformationModel } from "../../modes/cafe-information.model";
import { ApiService } from "../service/api-service";
import { catchError, EMPTY, finalize } from "rxjs";
import { RoutesEnum } from "../../enums/routes.enum";
import { StorageService } from "../service/storage/storage.service";
import { SessionKeyConstant } from "../../constants/session-key.constant";

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
