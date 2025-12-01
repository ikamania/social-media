import testphoto1 from "../../assets/G7DJfBbWQAACM9t.jpg"
import testphoto2 from "../../assets/5HdM0_7C_400x400.jpg"

import { FaRegComment } from "react-icons/fa"
import { FaRepeat } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa"
import Reaction from "./Reaction.tsx"

interface PostProps {
  email: string,
  text: string,
  photo?: string,
}

const Post = ({ email, text, photo }: PostProps) => {
  return (
    <div className="
      w-full p-[1rem] flex border-b-1 border-t-1 border-gray-100
    ">
      <img src={testphoto2} alt="photo here" className="
          w-[3rem] h-[3rem] object-cover rounded-full mr-[.5rem]
        " />

      <div className="mb-[1rem] flex-col">
        <div className="mb-[.5rem]">
          <div className="flex gap-[.5rem] text-[.9rem]">
            <p className="font-bold">Trae Young</p>
            <p className="text-gray-500">@TheTraeYoung</p>
          </div>
          <div>
            <p className="font-light">
              {text}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <img src={testphoto1} alt="photo here" className="w-[30rem] object-cover rounded-2xl" />
        </div>

        <div className="mt-[1rem] text-gray-500 flex gap-[3rem]">
          <Reaction icon={FaRegComment} number={61} />
          <Reaction icon={FaRepeat} number={400} />
          <Reaction icon={FaRegHeart} number={500} />
        </div>
      </div>
    </div>
  )
}

export default Post
