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

  useEffect(() => {
    if (token?.access && getComments)
      getSetComments()
  }, [getComments])

  useEffect(() => {
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
        <div className="mb-[.5rem]">
          <div className="relative flex gap-[.5rem] text-[.9rem]">
            <p className="font-bold">{post.user.username}</p>
            <p className="text-gray-500">{post.user.email}</p>

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

        <div className="flex justify-start pt-1">
          {post.image && (
            <img src={post.image} alt="photo here" className="w-[30rem] object-cover rounded-2xl" />
          )}
        </div>

        <div className="mt-2 text-gray-500 flex gap-[3rem]">
          {commentsOn && (
            <Reaction
              icon={FaRegComment}
              number={commentsCount || post.comments_count}
              onClick={commentToggle}
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
            css={`${liked ? "text-red-700" : "text-gray-500"}`}
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
