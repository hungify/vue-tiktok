import type { BaseMenu, MenuItemLink } from '~/interfaces/layout';
import languages from '~/assets/languages.json';

export const ROUTES_PATH = {
  home: '/',
  following: '/following',
  profile: '/@:nickname',
  upload: '/upload',
  search: '/search',
  live: '/live',
};

export const MENU_LINKS: MenuItemLink[] = [
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

export const BASE_MENU: BaseMenu[] = [
  {
    icon: 'earth-asia',
    title: 'Language',
    languages: languages.map((lang) => ({
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

export const USER_MENU: BaseMenu[] = [
  {
    icon: 'user-group',
    title: 'View profile',
    to: '/@:nickname',
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
