import { useEffect, useState } from "react"
import Menu from "./Menu"
import Post from "../components/post/Post"
import { fetchPosts } from "../service/postService"
import { useAuth } from "../context/AuthContext"
import showAlert from "../components/showAlert"

const ForYouFeed = () => {
  const { token, loadUser } = useAuth()
  const [posts, setPosts] = useState<any[]>([])

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
      {posts.map(post => (
        <Post
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
