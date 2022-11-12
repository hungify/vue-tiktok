export interface User {
  nickname: string;
  avatar: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  followers: number;
  likes: number;
}
