import type { IconName } from './icon';

export interface BaseMenuItem {
  title: string;
  to?: string;
  icon?: IconName;
  children?: BaseMenuItem[];
}

export type BaseMenuItemLink = Required<Omit<BaseMenuItem, 'children'>>;
