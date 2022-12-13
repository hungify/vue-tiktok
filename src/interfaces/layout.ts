import type { IconName } from './icon';

interface MenuItem {
  title: string;
  icon: IconName;
}

export interface MenuItemLink extends MenuItem {
  to: string;
}

export interface MenuItemLangue extends Omit<MenuItem, 'icon'> {
  languages?: {
    title: string;
    lang: string;
  }[];
}

export type BaseMenu = MenuItemLangue & Partial<Pick<MenuItemLink, 'to' | 'icon'>>;
