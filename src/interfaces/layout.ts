import type { IconName } from './icon';
import type { Modify } from './utils';

export interface MenuItemLink {
  title: string;
  icon: IconName;
  to: string;
}

type MenuItemLinkOptional = Modify<MenuItemLink, { to?: string }>;

export interface BaseMenu extends MenuItemLinkOptional {
  children?: {
    title: string;
    data: {
      code: string;
      type: string;
      title: string;
    }[];
  };
}

export interface UserMenu extends BaseMenu {
  separated?: boolean;
}
