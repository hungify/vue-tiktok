import type { User } from './user';

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  song: string;
  likesCount: number;
  sharesCount: number;
  commentsCount: number;
  hashtags: string[];
}

export type VideoPlayList = {
  video: Video;
  user: User;
};

export interface NewsFeed extends VideoPlayList {
  shouldBePlay: boolean;
}
