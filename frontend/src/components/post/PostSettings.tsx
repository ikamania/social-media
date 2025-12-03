import { GoKebabHorizontal } from "react-icons/go"
import { RiDeleteBinLine } from "react-icons/ri"
import { useState } from "react"

interface PostSettingsProps {
  handleDelete: () => void,
}

const PostSettings = ({ handleDelete }: PostSettingsProps) => {
  const [postSettings, setPostSettings] = useState(false)

  return (
    <>
      <div>
        <GoKebabHorizontal
          className="absolute right-1 text-[1.5rem] cursor-pointer"
          onClick={() => setPostSettings(prev => !prev)}
        />
        {postSettings && (
          <div
            className="
            absolute top-[1rem] right-[2rem] bg-gray-100 w-[4rem] h-[1.5rem]
            flex justify-center items-center rounded-full text-[1rem]
            cursor-pointer"
            onClick={handleDelete}
          >
            <RiDeleteBinLine />
          </div>
        )}
      </div>
    </>
  )
}

export default PostSettings
