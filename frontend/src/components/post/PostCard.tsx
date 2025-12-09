import ProfilePicture from "./ProfilePicture.tsx"

import { FaRegComment } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"
import Reaction from "./Reaction.tsx"
import { useAuth } from "../../context/AuthContext.tsx"
import { toggleLike } from "../../service/postService.ts"
import { useState, useEffect } from "react"
import UploadBox from "./UploadBox.tsx"
import CloseButton from "./CloseButton.tsx"
import { createComment, fetchComments, deletePost } from "../../service/postService.ts"
import showAlert from "../showAlert.ts"
import PostSettings from "./PostSettings.tsx"
import type { Post } from "../../types/post.ts"

interface PostProps {
  post: Post
  commentsOn: boolean,
  likeTarget: "post" | "comment",
}

const PostCard = ({ post, commentsOn, likeTarget }: PostProps) => {
  const { token, user } = useAuth()
  const [likes, setLikes] = useState(post.likes)
  const [liked, setLiked] = useState(post.liked)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Post[]>([])
  const [getComments, setGetComments] = useState(false)
  const [commentsCount, setCommentsCount] = useState(null)
  const [time, setTime] = useState("")

  const commentToggle = () => {
    setShowComments((prev: boolean) => !prev)

    if (!getComments)
      setGetComments(true)
  }

  const getSetComments = async () => {
    try {
      const data = await fetchComments(token.access, post.id)

      setComments(data)
      setCommentsCount(data.length)
    } catch {
      showAlert("error", "internal error")
    }
  }

  const timeAgo = (createTime: string) => {
    const date = new Date(createTime)
    const now = new Date()

    const f = Math.floor
    const seconds = f((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60)
      return `${seconds}s`
    const m = f(seconds / 60)
    if (m < 60)
      return `${m}m`
    const h = f(m / 60)
    if (h < 24)
      return `${h}h`
    const d = f(h / 24)
    if (d < 60)
      return `${d}d`
    const w = f(d / 7)
    return `${w}w`
  }

  useEffect(() => {
    if (token?.access && getComments)
      getSetComments()
  }, [getComments])

  useEffect(() => {
    setTime(timeAgo(post.created_at))
    const handler = () => {
      getSetComments()
    }
    window.addEventListener("new comment", handler)

    return () => {
      window.removeEventListener("new comment", handler)
    }
  }, [])

  return (
    <div className="
      w-full p-[1rem] flex border-b-1 border-gray-100
    ">
      <ProfilePicture image={post.user.image} to={post.user.username} />

      <div className="flex-col w-full">
        <div>
          <div className="relative flex gap-[.4rem] text-[.9rem] text-gray-500">
            <p className="font-bold hidden sm:block text-black">{post.user.name} {post.user.surname}</p>
            <p>{post.user.username}</p>
            <p>· {time}</p>

            {post.user.email == user?.email && (
              <PostSettings
                handleDelete={() => deletePost(post.id.toString(), token?.access, likeTarget)}
              />
            )}
          </div>
          <div>
            <p className="text-[.9rem] my-1">
              {post.content}
            </p>
          </div>
        </div>

        <div className="flex justify-start py-1">
          {post.image && (
            <img src={post.image} alt="photo here" className="w-[30rem] object-cover rounded-2xl" />
          )}
        </div>

        <div className="text-gray-500 flex gap-[2rem]">
          {commentsOn && (
            <Reaction
              icon={FaRegComment}
              number={commentsCount || post.comments_count}
              onClick={commentToggle}
              color="blue"
            />
          )}
          <Reaction
            icon={FaRegHeart}
            number={likes}
            onClick={async () => {
              const response = await toggleLike(post.id, likeTarget, token.access)
              const newLiked = response.liked

              setLiked(newLiked)
              setLikes(prev => (newLiked ? prev + 1 : prev - 1))
            }}
            color="red"
            css={`${liked ? "text-red-700" : ""}`}
          />
        </div>

        {(commentsOn && showComments) && (
          <>
            <UploadBox upload={createComment} postId={post.id} buttonText="Reply" placeholder="Post your reply" />
            <div className="relative">
              <CloseButton
                text="↑"
                onClick={() => commentToggle()}
                css="bottom-1 font-bold text-[.8rem]"
              />
              {comments.map(comment => (
                <PostCard
                  key={comment.id}
                  post={comment}
                  commentsOn={false}
                  likeTarget="comment"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PostCard
