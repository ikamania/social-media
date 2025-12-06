import { useEffect, useState } from "react"
import Menu from "./Menu"
import PostCard from "../components/post/PostCard"
import { type Post } from "../types/post.ts"
import { fetchPosts } from "../service/postService"
import { useAuth } from "../context/AuthContext"
import showAlert from "../components/showAlert"

const ForYouFeed = () => {
  const { token, loadUser } = useAuth()
  const [posts, setPosts] = useState<Post[] | null>(null)

  const getPosts = async () => {
    try {
      const data = await fetchPosts(token.access)
      setPosts(data)
    } catch {
      showAlert("error", "internal error")
    }
  }

  useEffect(() => {
    if (token?.access) {
      loadUser()
      getPosts()
    }
  }, [])

  useEffect(() => {
    const handler = () => {
      getPosts()
    }
    window.addEventListener("new post", handler)

    return () => {
      window.removeEventListener("new post", handler)
    }
  }, [])

  return (
    <>
      <Menu />
      {posts && posts.map(post => (
        <PostCard
          key={post.id}
          post={post}
          commentsOn={true}
          likeTarget="post"
        />
      ))}
    </>
  )
}

export default ForYouFeed
