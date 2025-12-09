import { type IconType } from "react-icons"

interface ReactionProps {
  number: number,
  icon: IconType,
  onClick?: () => void,
  color: string,
  css?: string,
}

const Reaction = ({ icon: Icon, number, onClick, css, color }: ReactionProps) => {
  return (
    <div
      className={`
          w-fit h-fit p-[.5rem] rounded-full flex justify-center items-center
          cursor-pointer  transition-colors duration-300 relative
          ${color == "blue" ? "hover:text-blue-700 hover:bg-blue-400/40" : ""}
          ${color == "red" ? "hover:text-red-700 hover:bg-red-400/40" : ""}
          ${css}
        `}
      onClick={onClick}
    >
      <Icon />
      <p className="text-[.8rem] absolute -right-[.2rem]">{number}</p>
    </div>
  )
}

export default Reaction
