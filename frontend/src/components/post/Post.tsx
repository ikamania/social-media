import testphoto1 from "../../assets/G7DJfBbWQAACM9t.jpg"
import ProfilePicture from "./ProfilePicture.tsx"

import { FaRegComment } from "react-icons/fa"
import { FaRepeat } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa"
import Reaction from "./Reaction.tsx"
import { useAuth } from "../../context/AuthContext.tsx"
import { toggleLike } from "../../service/postService"
import { useState } from "react"

interface PostProps {
  post: {
    id: number,
    user: {
      id: number,
      username: string,
      email: string,
    },
    text: string,
    image?: string,
    liked: boolean,
    likes: number,
  }
}

const Post = ({ post }: PostProps) => {
  const { token } = useAuth()
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.liked);

  return (
    <div className="
      w-full p-[1rem] flex border-b-1 border-gray-100
      hover:bg-gray-50
    ">
      <ProfilePicture />

      <div className="flex-col">
        <div className="mb-[.5rem]">
          <div className="flex gap-[.5rem] text-[.9rem]">
            <p className="font-bold">{post.user.username}</p>
            <p className="text-gray-500">@{post.user.email}</p>
          </div>
          <div>
            <p className="text-[.9rem] my-1">
              {post.text}
            </p>
          </div>
        </div>

        <div className="flex justify-start pt-1">
          {post.image && (
            <img src={post.image} alt="photo here" className="w-[30rem] object-cover rounded-2xl" />
          )}
        </div>

        <div className="mt-2 text-gray-500 flex gap-[3rem]">
          <Reaction icon={FaRegComment} number={61} />
          <Reaction icon={FaRepeat} number={400} />
          <Reaction
            icon={FaRegHeart}
            number={likes}
            onClick={async () => {
              const response = await toggleLike(post.id, token.access)
              const newLiked = response.liked

              setLiked(newLiked)
              setLikes(prev => (newLiked ? prev + 1 : prev - 1))
            }}
            css={`${liked ? "text-red-700" : "text-gray-500"}`}
          />
        </div>
      </div>
    </div>
  )
}

export default Post
