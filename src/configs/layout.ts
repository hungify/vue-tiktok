import type { BaseMenu, MenuItemLink, UserMenu } from '~/interfaces/layout';

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
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: 'question',
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: 'keyboard',
    title: 'Keyboard shortcuts',
  },
];

export const USER_MENU: UserMenu[] = [
  {
    icon: 'user-group',
    title: 'View profile',
    to: '/@hoaa',
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
  {
    icon: 'question',
    title: 'Log out',
    to: '/logout',
    separated: true,
  },
];
