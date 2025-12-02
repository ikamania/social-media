import ProfilePicture from "./ProfilePicture"
import { FaRegImage } from "react-icons/fa6"
import { FaRegSmileBeam } from "react-icons/fa"
import { useRef } from "react"

const PostUpload = () => {
  const textRef = useRef<HTMLTextAreaElement>(null)

  const handleText = () => {
    if (textRef.current) {
      textRef.current.style.height = "auto"
      textRef.current.style.height = textRef.current.scrollHeight + "px"
    }
  }

  return (
    <div className="w-full p-[1rem] flex">
      <ProfilePicture />

      <div className="w-full">
        <div className="w-full flex items-center">
          <textarea placeholder="What`s happening?"
            ref={textRef}
            onInput={handleText}
            rows={1}
            className="
            mb-[.5rem] text-[1.2rem] outline-none resize-none
            w-full overflow-hidden pt-[.5rem] text-gray-800
            "/>
        </div>

        <div className="w-full flex justify-between">
          <div className="
          flex items-center text-blue-400 text-[1.2rem]
          gap-2
        ">
            <FaRegImage className="cursor-pointer" />
            <FaRegSmileBeam className="cursor-pointer" />
          </div>
          <button className="
          w-[4rem] h-[2rem] text-white font-bold bg-gray-400
          rounded-2xl p-[.3rem] cursor-pointer
        ">Post</button>
        </div>
      </div>
    </div>
  )
}

export default PostUpload
