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
          hover:text-${color}-700 hover:bg-${color}-400/40
          ${css}
        `}
      onClick={onClick}
    >
      <Icon className="" />
      <p className="text-[.8rem] absolute -right-[.2rem]">{number}</p>
    </div>
  )
}

export default Reaction
