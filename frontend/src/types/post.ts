export interface Post {
  id: number,
  user: {
    id: number,
    username: string,
    email: string,
    image?: string,
  },
  content: string,
  image?: string,
  liked: boolean,
  likes: number,
  comments_count: number,
}
