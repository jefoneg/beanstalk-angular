import { RoutesEnum } from '../enums/routes.enum';
import { SeparatorEnum } from '../enums/separator.enum';

export class NavigationItems {
  public static readonly NAV_LINKS = [
    {
      url: `${SeparatorEnum.Slash}${RoutesEnum.Home}`,
      urlName: 'Home',
    },
    {
      url: `${SeparatorEnum.Slash}${RoutesEnum.Cafes}`,
      urlName: 'Cafes',
    },
    {
      url: `${SeparatorEnum.Slash}${RoutesEnum.Reviews}`,
      urlName: 'Reviews',
    },
  ];

  public static readonly PROFILE_LINK = `${SeparatorEnum.Slash}${RoutesEnum.Profile}`;
}
