import testphoto1 from "../../assets/G7DJfBbWQAACM9t.jpg"
import ProfilePicture from "./ProfilePicture.tsx"

import { FaRegComment } from "react-icons/fa"
import { FaRepeat } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa"
import Reaction from "./Reaction.tsx"

interface PostProps {
  user: {
    id: number,
    username: string,
    email: string,
  },
  text: string,
  image?: string,
}

const Post = ({ user, text, image }: PostProps) => {
  return (
    <div className="
      w-full p-[1rem] flex border-b-1 border-gray-100
      hover:bg-gray-50 cursor-pointer
    ">
      <ProfilePicture />

      <div className="flex-col">
        <div className="mb-[.5rem]">
          <div className="flex gap-[.5rem] text-[.9rem]">
            <p className="font-bold">{user.username}</p>
            <p className="text-gray-500">@{user.email}</p>
          </div>
          <div>
            <p className="text-[.9rem] my-1">
              {text}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          {image && (
            <img src={image} alt="photo here" className="w-[30rem] object-cover rounded-2xl" />
          )}
        </div>

        <div className="mt-2 text-gray-500 flex gap-[3rem]">
          <Reaction icon={FaRegComment} number={61} />
          <Reaction icon={FaRepeat} number={400} />
          <Reaction icon={FaRegHeart} number={500} />
        </div>
      </div>
    </div>
  )
}

export default Post
