import { CanActivateFn, Router } from "@angular/router";
import { SessionKeyConstant } from "../../constants/session-key.constant";
import { StorageService } from "../service/storage/storage.service";
import { inject } from "@angular/core";
import { RoutesEnum } from "../../enums/routes.enum";

/**
 * A guard that checks if a user has a valid access to a route.
 *
 * @returns  {CanActivateFn}  Returns `true` if the user has a valid access, `false` otherwise.
 */
export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const userAcess = storageService.getItem(SessionKeyConstant.USER_ACCESS);
  const router = inject(Router);

  if (new Date().getTime() > new Date(userAcess?.expiresAt).getTime()) {
    router.navigate([RoutesEnum.FullPath]);

    return false;
  }

  return true;
};
