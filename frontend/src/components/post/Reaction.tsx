import { type IconType } from "react-icons"

interface ReactionProps {
  number: number,
  icon: IconType,
  onClick?: () => void,
  css?: string,
}

const Reaction = ({ icon: Icon, number, onClick, css }: ReactionProps) => {
  return (
    <div
      className="flex items-center gap-1"
      onClick={onClick}
    >
      <Icon className={`text-[1.1rem] cursor-pointer ${css}`} />
      <p className="text-[.8rem]">{number}</p>
    </div>
  )
}

export default Reaction
