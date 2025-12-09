export interface Post {
  id: number,
  user: {
    id: number,
    username: string,
    name: string,
    surname: string,
    email: string,
    image?: string,
  },
  content: string,
  image?: string,
  liked: boolean,
  likes: number,
  comments_count: number,
  created_at: string,
}
