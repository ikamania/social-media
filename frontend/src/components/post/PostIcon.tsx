import type { IconType } from "react-icons"

interface PostIconProps {
  icon: IconType,
  onClick: () => void,
}

const PostIcon = ({ icon: Icon, onClick }: PostIconProps) => {
  return (
    <Icon
      onClick={onClick}
      className="
        cursor-pointer text-blue-400 text-[1.2rem]
        hover:text-blue-700 transition-colors duration-300
      "
    />
  )
}

export default PostIcon
