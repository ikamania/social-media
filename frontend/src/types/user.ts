export interface User {
  id: number,
  username: string,
  email: string,
  image?: string,
  date_joined: string,
  following_count: number,
  followers_count: number,
  is_following: boolean,
}
