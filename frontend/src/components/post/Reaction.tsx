import { type IconType } from "react-icons"

interface ReactionProps {
  number: number,
  icon: IconType,
}

const Reaction = ({ icon: Icon, number }: ReactionProps) => {
  return (
    <div className="flex items-center gap-1">
      <Icon className="text-[1.1rem] cursor-pointer" />
      <p className="text-[.8rem]">{number}</p>
    </div>
  )
}

export default Reaction
