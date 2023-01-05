import languages from '~/assets/languages.json';
import type { BaseMenuItem, BaseMenuItemLink } from '~/interfaces/layout';

export const ROUTES_PATH = {
  home: '/',
  following: '/following',
  profile: '/@:nickname',
  upload: '/upload',
  search: '/search',
  live: '/live',
};

export const MENU_LINKS: BaseMenuItemLink[] = [
  {
    title: 'For You',
    icon: 'home',
    to: '/',
  },
  {
    title: 'Following',
    icon: 'user-group',
    to: '/following',
  },
  {
    title: 'LIVE',
    icon: 'live',
    to: '/live',
  },
];

export const BASE_MENU: BaseMenuItem[] = [
  {
    icon: 'alphabet',
    title: 'English',
    children: languages.map((lang) => ({
      title: lang.title,
      lang: lang.lang,
    })),
  },
  {
    icon: 'question',
    title: 'Feedback and help',
    to: 'https://www.tiktok.com/feedback',
  },
  {
    icon: 'keyboard',
    title: 'Keyboard shortcuts',
  },
];

export const USER_MENU: BaseMenuItem[] = [
  {
    icon: 'user-group',
    title: 'View profile',
  },
  {
    icon: 'comment',
    title: 'Get coins',
    to: '/coin',
  },
  {
    icon: 'earth-asia',
    title: 'Settings',
    to: '/settings',
  },
  ...BASE_MENU,
];
